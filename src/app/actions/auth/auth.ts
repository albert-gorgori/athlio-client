"use server";

import { createClient } from "@/utils/supabase/server";
import { AuthResult } from "@/types/userTypes";
import { redirect } from "next/dist/client/components/navigation";

const supabase = await createClient();
/**
 * Sign in with email and password.
 */
export async function signIn(params: {
  email: string;
  password: string;
}): Promise<AuthResult> {
  
  const { email, password } = params;
  const { data,error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return {
    user: data?.user ?? null,
    session: data?.session ?? null,
    error: error?.message ?? null,
  };
}

/**
 * Sign up with email and password.
 * If email confirmation is enabled, session will be null until the user verifies their email.
 */
export async function signUp(params: {
  username: string;
  email: string;
  password: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata?: Record<string, any>;
}): Promise<AuthResult> {
  try {
    const { email, password, metadata } = params;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: metadata },
    });

    if (error) {
      return { user: null, session: null, error: error.message };
    }

    const responseData = {
      user: data?.user ?? null,
      session: data?.session ?? null,
      error: null,
    };

    return responseData;
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unexpected error during sign up.";
    return {
      user: null,
      session: null,
      error: message,
    };
  }
}

export const signOut = async () => {
  await supabase.auth.signOut();
  redirect("/sign-in");
};
