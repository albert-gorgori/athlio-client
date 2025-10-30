import "server-only";

import { SIGN_IN_ROUTE } from "@/lib/constants";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { cache } from "react";


export const requireUser = cache(async () => {
const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    return redirect(SIGN_IN_ROUTE);
  }
})