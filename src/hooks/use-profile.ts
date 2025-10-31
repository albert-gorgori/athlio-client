import { UserProfile } from "@/types/userTypes";
import { useQuery } from "@tanstack/react-query";


export function useProfile(initial?: UserProfile) {
  return useQuery<UserProfile>({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await fetch("/api/profiles", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch profile");
      return res.json() as Promise<UserProfile>;
    },
    initialData: initial,
    staleTime: 5 * 60_000,
    refetchOnWindowFocus: false,
  });
}