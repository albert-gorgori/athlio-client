import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import z from "zod";
import { SIGN_IN_ROUTE } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const authFormSchema = (type: string) =>
  z.object({
  // Sign up and Sign in fields
  email: z.email().min(1).max(255),
  password: z.string().min(6),
  // Only for Sign up
  firstName: type === SIGN_IN_ROUTE ? z.string().optional() : z.string().min(3),
    lastName: type === SIGN_IN_ROUTE ? z.string().optional() : z.string().min(3),
    address1: type === SIGN_IN_ROUTE ? z.string().optional() : z.string().max(50),
    state:
      type === SIGN_IN_ROUTE ? z.string().optional() : z.string().min(2).max(2),
    postalCode:
      type === SIGN_IN_ROUTE ? z.string().optional() : z.string().min(3).max(6),
    dateOfBirth: type === SIGN_IN_ROUTE ? z.string().optional() : z.string().min(3),
    ssn: type === SIGN_IN_ROUTE ? z.string().optional() : z.string().min(3),
    city: type === SIGN_IN_ROUTE ? z.string().optional() : z.string().min(3),
});

export const strOrNull = (v: FormDataEntryValue | null) => {
    const s = (v ?? "").toString().trim()
    return s.length ? s : null
}
export const numOrNull = (v: FormDataEntryValue | null) => {
    const s = (v ?? "").toString().trim()
    if (!s) return null
    const n = Number(s)
    return Number.isFinite(n) ? n : null
}

export function initials(name?: string | null) {
    if (!name) return "U"
    const parts = name.trim().split(" ").filter(Boolean)
    if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase()
    return (parts[0]![0] + parts[parts.length - 1]![0]).toUpperCase()
}