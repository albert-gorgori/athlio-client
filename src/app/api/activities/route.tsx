import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

// Adjust this to match your DB table name that stores Strava activities
const TABLE = process.env.STRAVA_ACTIVITIES_TABLE || "strava_activities";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Number(searchParams.get("limit") ?? "5");

  const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError) {
      return NextResponse.json({ error: userError.message }, { status: 401 });
    }
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Assumes an owner column user_id referencing auth.users.id and RLS policies in place
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .eq("user_id", user.id)
      .order("start_date", { ascending: false })
      .limit(Math.max(1, Math.min(50, limit)));

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data ?? [], { status: 200 });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
