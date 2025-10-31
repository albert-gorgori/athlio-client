import "server-only";

import { requireUser } from "../user/require-user";
import { createClient } from "@/lib/supabase/server";

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
