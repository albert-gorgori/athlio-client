import { numOrNull, strOrNull } from "@/lib/utils"
import { TablesUpdate } from "@/types/database.types"
import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"

// Server Action: update profile
export async function updateProfile(formData: FormData) {
    "use server"

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const payload: TablesUpdate<"profiles"> = {
        full_name: strOrNull(formData.get("full_name")),
        avatar_url: strOrNull(formData.get("avatar_url")),
        birth_date: strOrNull(formData.get("birth_date")), // ISO (yyyy-mm-dd)
        gender: strOrNull(formData.get("gender")),
        height_cm: numOrNull(formData.get("height_cm")),
        weight_kg: numOrNull(formData.get("weight_kg")),
        city: strOrNull(formData.get("city")),
        country: strOrNull(formData.get("country")),
        language: strOrNull(formData.get("language")),
        timezone: strOrNull(formData.get("timezone")),
        units: strOrNull(formData.get("units")), // "metric" | "imperial" (string libre en tu schema)
        preferred_sport: strOrNull(formData.get("preferred_sport")),
        sport_level: strOrNull(formData.get("sport_level")),
        training_days_per_week: numOrNull(formData.get("training_days_per_week")),
        ai_personality: strOrNull(formData.get("ai_personality")),
        main_goal: strOrNull(formData.get("main_goal")),
    }

    await supabase.from("profiles").update(payload).eq("id", user.id)
    revalidatePath("/account")
}