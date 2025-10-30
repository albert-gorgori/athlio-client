import { getUserProfile } from "@/app/data/profile/require-profile";
import { NavUser } from "@/components/web/nav-user";



// Server Component: fetches the profile and renders the client NavUser
export default async function NavUserServer() {
  const profile = await getUserProfile()

  return <NavUser user={profile} />;
}
