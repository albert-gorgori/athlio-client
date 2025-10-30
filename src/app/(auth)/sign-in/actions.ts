"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { AuthResult } from "@/types/userTypes";
import { redirect } from "next/dist/client/components/navigation";
import { DASHBOARD_ROUTE, ERROR_ROUTE, HOME_ROUTE } from "@/lib/constants";

export async function signIn(params: {
  email: string;
  password: string;
}): Promise<AuthResult> {
  const supabase = await createClient();
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: params.email,
    password: params.password,
  };
  const { error } = await supabase.auth.signInWithPassword(data);
  if (error) {
    redirect(ERROR_ROUTE);
  }
  revalidatePath(HOME_ROUTE, "layout");
  redirect(DASHBOARD_ROUTE);
}
