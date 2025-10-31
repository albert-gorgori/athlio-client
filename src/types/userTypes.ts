import type { Session, User} from "@supabase/supabase-js";
import { Tables } from "./database.types";

type Profile = Tables<"profiles">;

export type AuthResult = {
  user: User | null;
  session: Session | null;
  error: string | null;
};

export type UserProfile = { profile: Profile | null; email: string | null };