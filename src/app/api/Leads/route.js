export async function POST(request) {
  try {
    const { email, phone, tool, returning } = await request.json();

    if (!email || !tool) {
      return Response.json({ error: "Email and tool are required" }, { status: 400 });
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

    console.log("Posting to SheetDB:", JSON.stringify(rowData));

    const sheetRes = await fetch(process.env.SHEETDB_API_URL, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: [rowData] }),
    });

    const sheetData = await sheetRes.json();
    console.log("SheetDB response:", JSON.stringify(sheetData));

    return Response.json({ success: true });

  } catch (error) {
    console.error("Leads API error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
