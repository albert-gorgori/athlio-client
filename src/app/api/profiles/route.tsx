import { NextResponse } from "next/server";
import { getClient } from "../supabaseClient";

// /app/api/users/route.tsx
// TODO: FIX: Add proper validation and error handling and TypeScript types
const PROFILES_TABLE = "Profiles"

function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

// GET /api/users
// - List users with optional pagination
// - Or fetch a single user by ?id=...
export async function GET(req: Request) {
  try {
    const supabase = getClient();
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const limit = Math.min(Number(url.searchParams.get("limit") ?? 50), 200);
    const offset = Number(url.searchParams.get("offset") ?? 0);
    const orderBy = url.searchParams.get("orderBy") ?? "created_at";
    const orderDir = (url.searchParams.get("orderDir") ?? "desc") as
      | "asc"
      | "desc";

    if (id) {
      const { data, error } = await supabase
        .from(PROFILES_TABLE)
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) return jsonError(error.message, 500);
      if (!data) return jsonError("User not found", 404);
      return NextResponse.json(data);
    }

    const { data, error, count } = await supabase
      .from(PROFILES_TABLE)
      .select("*", { count: "exact" })
      .order(orderBy, { ascending: orderDir === "asc" })
      .range(offset, offset + limit - 1);

    if (error) return jsonError(error.message, 500);
    return NextResponse.json({
      data: data ?? [],
      pagination: { limit, offset, count: count ?? 0 },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return jsonError(e?.message || "Unexpected error", 500);
  }
}

// POST /api/users
// - Create a new user row
export async function POST(req: Request) {
  try {
    const supabase = getClient();
    const contentType = req.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      return jsonError("Content-Type must be application/json", 415);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body = (await req.json()) as Record<string, any>;

    // Minimal example validation; adjust to your table schema
    if (!body?.email) return jsonError("Missing required field: email", 422);

    const { data, error } = await supabase
      .from(PROFILES_TABLE)
      .insert(body)
      .select()
      .single();

    if (error) return jsonError(error.message, 500);
    return NextResponse.json(data, { status: 201 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return jsonError(e?.message || "Unexpected error", 500);
  }
}

// PATCH /api/users?id=...
// - Update user fields
export async function PATCH(req: Request) {
  try {
    const supabase = getClient();
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id) return jsonError("Missing id query parameter", 422);

    const contentType = req.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      return jsonError("Content-Type must be application/json", 415);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updates = (await req.json()) as Record<string, any>;
    if (!updates || Object.keys(updates).length === 0) {
      return jsonError("No fields provided to update", 422);
    }

    // Avoid changing primary keys unless explicitly intended
    delete updates.id;

    const { data, error } = await supabase
      .from(PROFILES_TABLE)
      .update(updates)
      .eq("id", id)
      .select()
      .maybeSingle();

    if (error) return jsonError(error.message, 500);
    if (!data) return jsonError("User not found", 404);
    return NextResponse.json(data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return jsonError(e?.message || "Unexpected error", 500);
  }
}

// DELETE /api/users?id=...
// - Delete a user by id
export async function DELETE(req: Request) {
  try {
    const supabase = getClient();
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id) return jsonError("Missing id query parameter", 422);

    const { data, error } = await supabase
      .from(PROFILES_TABLE)
      .delete()
      .eq("id", id)
      .select()
      .maybeSingle();

    if (error) return jsonError(error.message, 500);
    if (!data) return jsonError("User not found", 404);

    return NextResponse.json({ deleted: true, id });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return jsonError(e?.message || "Unexpected error", 500);
  }
}
