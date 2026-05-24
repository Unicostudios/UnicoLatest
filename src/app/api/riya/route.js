import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const res = await fetch(
    "https://niquo-bathsy-git-main-unico-studios-projects.vercel.app/api/niquo",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );
  const data = await res.json();
  return NextResponse.json(data);
}
