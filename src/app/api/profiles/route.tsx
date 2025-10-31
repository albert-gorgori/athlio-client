import { NextResponse } from "next/server";
import { getCurrentProfile } from "@/app/data/profile/require-profile";


export async function GET() {
  try {
    const data = await getCurrentProfile(); // { profile, email }
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: e ? "Unauthorized" : e }, { status: 401 });
  }
}