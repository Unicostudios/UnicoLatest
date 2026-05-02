export async function POST(request) {
  try {
    const body = await request.json();
    const { email, phone, tool, returning } = body;

    console.log("LEADS API HIT:", email, phone, tool);
    console.log("SHEETDB URL:", process.env.SHEETDB_API_URL);

    if (!email || !tool) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    const date = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    const rowData = {
      Email: email,
      Phone: returning ? "Returning" : (phone || "Not provided"),
      Tool: tool,
      Date: date,
      Status: returning ? "Return Visit" : "New Lead",
      "Demo Completed": "No",
    };

    console.log("Sending to SheetDB:", JSON.stringify(rowData));

    const sheetRes = await fetch(process.env.SHEETDB_API_URL, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: [rowData] }),
    });

    const text = await sheetRes.text();
    console.log("SheetDB raw response:", text);

    return Response.json({ success: true });

  } catch (error) {
    console.error("LEADS ERROR:", error.message, error.stack);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
