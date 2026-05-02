export async function POST(request) {
  try {
    const { email, phone, tool, returning } = await request.json();

    if (!email || !tool) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    const date = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    // Check if email already exists in sheet
    const checkRes = await fetch(
      `${process.env.SHEETDB_API_URL}/search?Email=${encodeURIComponent(email)}`,
      {
        headers: { "Accept": "application/json" },
      }
    );
    const existing = await checkRes.json();
    const isReturning = returning || (Array.isArray(existing) && existing.length > 0);

    const rowData = {
      Email: email,
      Phone: isReturning ? (existing[0]?.Phone || "Returning") : (phone || "Not provided"),
      Tool: tool,
      Date: date,
      Status: isReturning ? "Return Visit" : "New Lead",
      "Demo Completed": "No",
    };

    console.log("Saving:", JSON.stringify(rowData));

    const sheetRes = await fetch(process.env.SHEETDB_API_URL, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: [rowData] }),
    });

    const result = await sheetRes.json();
    console.log("SheetDB:", JSON.stringify(result));

    return Response.json({ success: true, isReturning });

  } catch (error) {
    console.error("Error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
