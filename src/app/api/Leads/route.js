export async function POST(request) {
  try {
    const { email, phone, tool, returning } = await request.json();

    if (!email || !tool) {
      return Response.json({ error: "Email and tool are required" }, { status: 400 });
    }

    const date = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    const data = {
      Email: email,
      Phone: returning ? "Returning visitor" : (phone || "Not provided"),
      Tool: tool,
      Date: date,
      Status: returning ? "Return Visit" : "New Lead",
      "Demo Completed": "No",
    };

    console.log("Saving to SheetDB:", JSON.stringify(data));

    const response = await fetch(process.env.SHEETDB_API_URL, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: [data] }),
    });

    const result = await response.json();
    console.log("SheetDB result:", JSON.stringify(result));

    return Response.json({ success: true });

  } catch (error) {
    console.error("Leads API error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
