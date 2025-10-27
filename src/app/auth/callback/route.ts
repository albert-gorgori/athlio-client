
// import { getUser } from "@/app/actions/auth/auth";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const encodedRedirectTo = requestUrl.searchParams.get("redirect") || "/app";
  const origin = requestUrl.origin
  const redirectTo = decodeURIComponent(encodedRedirectTo);

  const supabase = await createClient();

  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
    // const userData = await getUser();
    // await getOrCreateUserAvatar(userData);
  }

  // Set session cookie
  if (redirectTo) {
    return NextResponse.redirect(`${origin}${redirectTo}`);
  } 

  return NextResponse.redirect(`${origin}/protected`);
}