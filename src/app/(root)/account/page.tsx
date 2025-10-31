import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getCurrentProfile } from "@/app/data/profile/require-profile"
import { updateProfile } from "./actions"
import { initials } from "@/lib/utils"
import Breadcrumbs from "@/components/web/layout/shell/breadcrumbs/breadcrumbs-nav"
import { ACCOUNT_ROUTE } from "@/lib/constants"

export const metadata: Metadata = {
    title: "Account",
    description: "Edit your profile",
}

export const dynamic = "force-dynamic"

async function AccountForm() {
    const { profile, email } = await getCurrentProfile();

    return (
        <div className="container mx-auto max-w-5xl px-4 py-8">
            <Card>
                <CardHeader>
                    <CardTitle>Account</CardTitle>
                    <CardDescription>Update your profile information.</CardDescription>
                </CardHeader>

                <form action={updateProfile}>
                    <CardContent className="space-y-6">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-16 w-16">
                                <AvatarImage src={profile?.avatar_url ?? undefined} alt={profile?.full_name ?? "User avatar"} />
                                <AvatarFallback>{initials(profile?.full_name)}</AvatarFallback>
                            </Avatar>
                            <div className="text-sm text-muted-foreground">Avatar URL configurable abajo.</div>
                        </div>

                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="full_name">Full name</Label>
                                <Input id="full_name" name="full_name" defaultValue={profile?.full_name ?? ""} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" type="email" value={email ?? ""} disabled />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="avatar_url">Avatar URL</Label>
                                <Input id="avatar_url" name="avatar_url" placeholder="https://..." defaultValue={profile?.avatar_url ?? ""} />
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="birth_date">Birth date</Label>
                                    <Input id="birth_date" name="birth_date" type="date" defaultValue={profile?.birth_date ?? ""} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="gender">Gender</Label>
                                    <Input id="gender" name="gender" placeholder="male | female | other" defaultValue={profile?.gender ?? ""} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="height_cm">Height (cm)</Label>
                                    <Input id="height_cm" name="height_cm" type="number" step="0.1" defaultValue={profile?.height_cm ?? ""} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="weight_kg">Weight (kg)</Label>
                                    <Input id="weight_kg" name="weight_kg" type="number" step="0.1" defaultValue={profile?.weight_kg ?? ""} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="city">City</Label>
                                    <Input id="city" name="city" defaultValue={profile?.city ?? ""} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="country">Country</Label>
                                    <Input id="country" name="country" defaultValue={profile?.country ?? ""} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="language">Language</Label>
                                    <Input id="language" name="language" placeholder="es-ES, en-US…" defaultValue={profile?.language ?? ""} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="timezone">Timezone</Label>
                                    <Input id="timezone" name="timezone" placeholder="Europe/Madrid" defaultValue={profile?.timezone ?? ""} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="units">Units</Label>
                                    <Input id="units" name="units" placeholder="metric | imperial" defaultValue={profile?.units ?? ""} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="preferred_sport">Preferred sport</Label>
                                    <Input id="preferred_sport" name="preferred_sport" defaultValue={profile?.preferred_sport ?? ""} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="sport_level">Sport level</Label>
                                    <Input id="sport_level" name="sport_level" placeholder="beginner | intermediate | advanced" defaultValue={profile?.sport_level ?? ""} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="training_days_per_week">Training days/week</Label>
                                    <Input id="training_days_per_week" name="training_days_per_week" type="number" min={0} max={7} defaultValue={profile?.training_days_per_week ?? ""} />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="main_goal">Main goal</Label>
                                <Input id="main_goal" name="main_goal" placeholder="Run a marathon, lose weight…" defaultValue={profile?.main_goal ?? ""} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="ai_personality">AI coach preferences</Label>
                                <Textarea id="ai_personality" name="ai_personality" placeholder="Tone, style, constraints…" defaultValue={profile?.ai_personality ?? ""} rows={3} />
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="flex items-center justify-end gap-2 mt-4">
                        <Button type="reset" variant="ghost">Reset</Button>
                        <Button type="submit">Save changes</Button>
                    </CardFooter>
                </form>
            </Card>

            {!profile && (
                <p className="mt-4 text-sm text-destructive">
                    Could not load your profile.
                </p>
            )}
        </div>
    )

}

export default async function AccountPage() {
    const items = [
    { title: "Navigation.overview", href: "#" },
    { title: "Navigation.account", href: ACCOUNT_ROUTE, isCurrent: true },
  ];
  return (
    <>
      <Breadcrumbs items={items}>
        <AccountForm />
      </Breadcrumbs>
    </>
  );
}