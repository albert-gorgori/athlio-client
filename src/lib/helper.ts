import { createClient } from "@/lib/supabase/server";

// Nota: este archivo NO lleva "use server"

export async function getUserSSR() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error && error.message !== "Auth session missing!") {
    console.error("getUserSSR error:", error.message);
  }
  return user;
}

export async function getSessionSSR() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}