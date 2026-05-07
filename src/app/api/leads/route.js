// src/app/api/leads/route.js
// Replaces SheetDB entirely. Uses Supabase — free tier = 50,000 rows.

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, phone, tool, country, status } = body;
    const timestamp = new Date().toISOString();

    // Anonymous visit or tool click — goes to visitors table
    if (!email || email === "anonymous_visitor") {
      await supabase.from("visitors").insert([{
        type: status || "Visitor",
        tool: tool || null,
        country: country || null,
        created_at: timestamp,
      }]);
      return Response.json({ ok: true });
    }

    // Real email — upsert to leads table (never duplicate same email)
    await supabase.from("leads").upsert([{
      email: email.toLowerCase().trim(),
      phone: phone || null,
      tool: tool || null,
      country: country || null,
      status: status || "New Lead",
      demo_completed: false,
      updated_at: timestamp,
    }], { onConflict: "email" });

    return Response.json({ ok: true });

  } catch (err) {
    console.error("Leads POST error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const { email, demoCompleted, industry } = await request.json();
    if (!email) return Response.json({ error: "Email required" }, { status: 400 });

    const updateData = { updated_at: new Date().toISOString() };
    if (demoCompleted) { updateData.demo_completed = true; updateData.status = "Demo Completed"; }
    if (industry) updateData.industry = industry;

    await supabase.from("leads").update(updateData).eq("email", email.toLowerCase().trim());
    return Response.json({ ok: true });

  } catch (err) {
    console.error("Leads PATCH error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const adminKey = request.headers.get("x-admin-key");
    if (adminKey !== process.env.ADMIN_SECRET_KEY) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const type = new URL(request.url).searchParams.get("type") || "leads";

    if (type === "visitors") {
      const { data } = await supabase.from("visitors").select("*").order("created_at", { ascending: false }).limit(500);
      return Response.json({ data });
    }

    const { data } = await supabase.from("leads").select("*").order("updated_at", { ascending: false });
    return Response.json({ data });

  } catch (err) {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
