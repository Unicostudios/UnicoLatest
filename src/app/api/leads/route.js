export async function POST(request) {
  try {
    const { email, phone, tool, returning, country, status } = await request.json();

    // ─── ANONYMOUS VISITOR LOGGING ──────────────────────────────────────────
    // WHY: We log every page visit even without email/phone so we can see
    // real traffic volume in Google Sheets. Anonymous rows use "anonymous_visitor"
    // as the email and "Visitor" as the status — easy to filter separately.
    const isAnonymous = email === "anonymous_visitor";

    if (!isAnonymous && !email) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }
    if (!isAnonymous && !tool) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    const date = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    // Skip duplicate check for anonymous visitors — always log them
    let isReturning = returning || false;
    let existingPhone = "";
    let existingCountry = country || "Unknown";

    if (!isAnonymous) {
      const checkRes = await fetch(
        `${process.env.SHEETDB_API_URL}/search?Email=${encodeURIComponent(email)}`,
        { headers: { "Accept": "application/json" } }
      );
      const existing = await checkRes.json();
      isReturning = returning || (Array.isArray(existing) && existing.length > 0);
      existingPhone = isReturning ? (existing[0]?.Phone || "Returning") : (phone || "Not provided");
      existingCountry = isReturning ? (existing[0]?.Country || "Unknown") : (country || "Unknown");
    }

    const rowData = {
      Email: email,
      Phone: isAnonymous ? "" : existingPhone,
      Tool: tool || "Page Visit",
      Date: date,
      // ─── STATUS FIELD ──────────────────────────────────────────────────
      // WHY: This lets you filter your sheet easily:
      // "Visitor" = anonymous, just landed
      // "New Lead" = filled the gate for the first time
      // "Return Visit" = came back after filling gate before
      Status: isAnonymous ? "Visitor" : (status || (isReturning ? "Return Visit" : "New Lead")),
      "Demo Completed": "No",
      Country: isAnonymous ? (country || "Unknown") : existingCountry,
    };

    console.log("Saving:", JSON.stringify(rowData));

    const sheetRes = await fetch(process.env.SHEETDB_API_URL, {
      method: "POST",
      headers: { "Accept": "application/json", "Content-Type": "application/json" },
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
