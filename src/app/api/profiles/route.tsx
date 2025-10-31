import { NextResponse } from "next/server";
import { createClient } from "../../../lib/supabase/client";

// /app/api/users/route.tsx
// TODO: FIX: Add proper validation and error handling and TypeScript types
const PROFILES_TABLE = "Profiles"

function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}