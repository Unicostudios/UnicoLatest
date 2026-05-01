import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

async function saveToGoogleSheet(email, tool) {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!A:D:append?valueInputOption=RAW`;
  
  const date = new Date().toISOString();
  
  const body = {
    values: [[email, tool, date, 0]],
  };

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GOOGLE_ACCESS_TOKEN}`,
    },
    body: JSON.stringify(body),
  });
}

export async function POST(request) {
  try {
    const { email, tool } = await request.json();

    if (!email || !tool) {
      return Response.json({ error: "Email and tool are required" }, { status: 400 });
    }

    // Send notification email
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.NOTIFICATION_EMAIL,
      subject: `🔥 New Lead — ${tool} — ${email}`,
      html: `
        <h2>New Lead from Unico Studios AI Tools!</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Tool:</strong> ${tool}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString("en-IN")}</p>
        <br/>
        <p>Login to your dashboard to follow up!</p>
      `,
    });

    return Response.json({ success: true });

  } catch (error) {
    console.error(error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
