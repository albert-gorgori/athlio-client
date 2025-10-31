import "server-only";

import { requireUser } from "../user/require-user";
import { createClient } from "@/lib/supabase/server";
import type { Tables } from "@/types/database.types"


type Profile = Tables<"profiles">

export async function getUserProfile(): Promise<{ fullName: string; email: string; avatar: string }> {
    
  await requireUser();
  const supabase = await createClient();
  const userData = await supabase.auth.getUser();
//force a 2second delay to ensure profile is created

  await new Promise(resolve => setTimeout(resolve, 2000));
  //TODO: Cache the result of the profile fetch
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userData?.data?.user?.id || "");

    if (!data) {
      throw new Error("User profile not found");
    }
    

    const profile = {
        fullName: data[0].full_name || "",
        email: userData.data.user?.email || "",
        avatar: data[0].avatar_url || ""

    };
  return profile;
}

// SSR: obtiene perfil + email del auth
export async function getCurrentProfile(): Promise<{ profile: Profile | null; email: string | null }> {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { profile: null, email: null }

    const { data } = await supabase
        .from("profiles")
        .select(
            "id, created_at, updated_at, full_name, avatar_url, birth_date, gender, height_cm, weight_kg, city, country, language, timezone, units, preferred_sport, sport_level, training_days_per_week, ai_personality, main_goal"
        )
        .eq("id", user.id)
        .maybeSingle()

    return { profile: data ?? null, email: user.email ?? null }
}