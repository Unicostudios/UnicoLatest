// src/app/api/leads/route.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log("Supabase URL exists:", !!supabaseUrl);
console.log("Supabase Key exists:", !!supabaseKey);
console.log("Supabase Key prefix:", supabaseKey ? supabaseKey.substring(0, 15) : "MISSING");

const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, phone, tool, country, status } = body;
    const timestamp = new Date().toISOString();

    console.log("POST /api/leads called:", { email, tool, status });

    if (!email || email === "anonymous_visitor") {
      const { data, error } = await supabase.from("visitors").insert([{
        type: status || "Visitor",
        tool: tool || null,
        country: country || null,
        created_at: timestamp,
      }]);

      if (error) {
        console.error("SUPABASE VISITORS ERROR:", JSON.stringify(error));
        return Response.json({ ok: false, error: error.message }, { status: 500 });
      }

      console.log("Visitor inserted successfully");
      return Response.json({ ok: true });
    }

    const { data, error } = await supabase.from("leads").upsert([{
      email: email.toLowerCase().trim(),
      phone: phone || null,
      tool: tool || null,
      country: country || null,
      status: status || "New Lead",
      demo_completed: false,
      updated_at: timestamp,
    }], { onConflict: "email" });

    if (error) {
      console.error("SUPABASE LEADS ERROR:", JSON.stringify(error));
      return Response.json({ ok: false, error: error.message }, { status: 500 });
    }

    console.log("Lead upserted successfully");
    return Response.json({ ok: true });

  } catch (err) {
    console.error("Leads POST catch error:", err.message);
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

    const { error } = await supabase.from("leads").update(updateData).eq("email", email.toLowerCase().trim());
    if (error) console.error("SUPABASE PATCH ERROR:", JSON.stringify(error));

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Leads PATCH error:", err.message);
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
      const { data, error } = await supabase.from("visitors").select("*").order("created_at", { ascending: false }).limit(500);
      if (error) console.error("SUPABASE GET VISITORS ERROR:", JSON.stringify(error));
      return Response.json({ data });
    }

    const { data, error } = await supabase.from("leads").select("*").order("updated_at", { ascending: false });
    if (error) console.error("SUPABASE GET LEADS ERROR:", JSON.stringify(error));
    return Response.json({ data });

  } catch (err) {
    console.error("Leads GET error:", err.message);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
