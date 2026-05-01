import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { email, phone, tool, returning } = await request.json();

    if (!email || !tool) {
      return Response.json({ error: "Email and tool are required" }, { status: 400 });
    }

    const date = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    if (returning) {
      // Log return visit silently
      await fetch(process.env.SHEETDB_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: [{
            Email: email,
            Phone: "Returning visitor",
            Tool: tool,
            Date: date,
            Status: "Return Visit",
            "Demo Completed": "No",
          }]
        }),
      });

      return Response.json({ success: true, returning: true });
    }

    // New visitor — save to sheet
    await fetch(process.env.SHEETDB_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: [{
          Email: email,
          Phone: phone || "Not provided",
          Tool: tool,
          Date: date,
          Status: "New Lead",
          "Demo Completed": "No",
        }]
      }),
    });

    // Send notification to you
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.NOTIFICATION_EMAIL,
      subject: `🔥 New Lead — ${tool} — ${email}`,
      html: `
        <div style="font-family:sans-serif;max-width:500px;margin:0 auto;background:#111;color:#fff;padding:32px;border-radius:12px;">
          <h2 style="color:#a78bfa;margin-bottom:24px;">🔥 New Lead!</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
          <p><strong>Tool:</strong> ${tool}</p>
          <p><strong>Time:</strong> ${date}</p>
          <br/>
          <a href="https://calendly.com/unicostudioss/30min" style="background:#a78bfa;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;display:inline-block;margin-top:16px;">
            Book a Call with this Lead
          </a>
        </div>
      `,
    });

    // Send welcome email to user
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Welcome to Unico Studios AI Tools! 🚀",
      html: `
        <div style="font-family:sans-serif;max-width:500px;margin:0 auto;background:#111;color:#fff;padding:32px;border-radius:12px;">
          <h2 style="color:#a78bfa;margin-bottom:8px;">You're in! 🎉</h2>
          <p style="color:#888;margin-bottom:24px;">Welcome to Unico Studios AI Tools</p>
          <p style="color:#ccc;line-height:1.6;">You now have free access to all 3 AI tools:</p>
          <div style="margin:24px 0;display:flex;flex-direction:column;gap:12px;">
            <div style="background:#1a1a1a;border:1px solid #333;border-radius:10px;padding:16px;">
              <strong style="color:#a78bfa;">✍️ Startup Content Engine</strong>
              <p style="color:#888;font-size:14px;margin:4px 0 0;">Generate hooks, scripts, reels and CTAs</p>
            </div>
            <div style="background:#1a1a1a;border:1px solid #333;border-radius:10px;padding:16px;">
              <strong style="color:#f472b6;">💻 Vibe Code Fixer</strong>
              <p style="color:#888;font-size:14px;margin:4px 0 0;">Fix and improve your code instantly</p>
            </div>
            <div style="background:#1a1a1a;border:1px solid #333;border-radius:10px;padding:16px;">
              <strong style="color:#22d3ee;">⚡ Niquo — AI Sales Demo</strong>
              <p style="color:#888;font-size:14px;margin:4px 0 0;">See how AI can sell for your business</p>
            </div>
          </div>
          <a href="https://unicostudios.in/tools" style="background:linear-gradient(135deg,#a78bfa,#8b5cf6);color:#fff;padding:14px 28px;border-radius:10px;text-decoration:none;display:inline-block;font-weight:600;margin-top:8px;">
            Start Using Your Tools →
          </a>
          <p style="color:#555;font-size:12px;margin-top:24px;">Built with ❤️ by Unico Studios, Bangalore</p>
        </div>
      `,
    });

    return Response.json({ success: true });

  } catch (error) {
    console.error("Leads API error:", error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
