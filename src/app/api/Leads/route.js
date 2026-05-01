export async function POST(request) {
  try {
    const { email, phone, tool, returning } = await request.json();

    if (!email || !tool) {
      return Response.json({ error: "Email and tool are required" }, { status: 400 });
    }

    const date = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    if (returning) {
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

    // Save to Google Sheets first
    const sheetResponse = await fetch(process.env.SHEETDB_API_URL, {
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

    console.log("SheetDB response:", await sheetResponse.text());

    return Response.json({ success: true });

  } catch (error) {
    console.error("Leads API error:", error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
