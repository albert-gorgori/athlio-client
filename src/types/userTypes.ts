import type { Session, User} from "@supabase/supabase-js";

export type AuthResult = {
  user: User | null;
  session: Session | null;
  error: string | null;
};