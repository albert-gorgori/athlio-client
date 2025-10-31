"use server";

import { createClient } from "@/lib/supabase/server";
import { AuthResult } from "@/types/userTypes";
import { redirect } from "next/dist/client/components/navigation";
import { DASHBOARD_ROUTE, ERROR_ROUTE, HOME_ROUTE, SIGN_IN_ROUTE } from "@/lib/constants";
import { revalidatePath } from "next/cache";

/**
 * Sign in with email and password.
 */
// export async function signIn(params: {
//   email: string;
//   password: string;
// }): Promise<AuthResult> {
//   const supabase = await createClient();
//   const { email, password } = params;
//   const { data, error } = await supabase.auth.signInWithPassword({
//     email,
//     password,
//   });

//   return {
//     user: data?.user ?? null,
//     session: data?.session ?? null,
//     error: error?.message ?? null,
//   };
// }

/**
 * Sign up with email and password.
 * If email confirmation is enabled, session will be null until the user verifies their email.
 */
export async function signUp(params: {
  firstName: string | undefined;
  email: string;
  password: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata?: Record<string, any>;
}): Promise<AuthResult> {
  // try {
  //   const supabase = await createClient();
  //   const { email, password, metadata } = params;
  //   const { data, error } = await supabase.auth.signUp({
  //     email,
  //     password,
  //     options: { data: metadata },
  //   });

  //   if (error) {
  //     return { user: null, session: null, error: error.message };
  //   }

  //   const responseData = {
  //     user: data?.user ?? null,
  //     session: data?.session ?? null,
  //     error: null,
  //   };

  //   return responseData;
  // } catch (err) {
  //   const message =
  //     err instanceof Error ? err.message : "Unexpected error during sign up.";
  //   return {
  //     user: null,
  //     session: null,
  //     error: message,
  //   };
  // }

  const supabase = await createClient()
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: params.email,
    password: params.password,
  }
  const { error } = await supabase.auth.signUp(data)
  if (error) {
    redirect(ERROR_ROUTE)
  }
  revalidatePath(HOME_ROUTE, 'layout')
  redirect(SIGN_IN_ROUTE)
}

export const signOut = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath(HOME_ROUTE, 'layout');
  redirect("/sign-in");
};

export const getUser = async () => {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) {
    return null;
  }

  return user;
};

export const getSession = async () => {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
};
