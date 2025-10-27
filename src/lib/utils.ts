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