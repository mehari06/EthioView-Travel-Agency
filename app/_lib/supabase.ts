import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.warn("Supabase URL or Key is missing from environment variables!");
}

const fallbackSupabaseUrl = "https://placeholder.invalid";
const fallbackSupabaseKey = "placeholder-anon-key";

export const supabase = createClient(
    supabaseUrl || fallbackSupabaseUrl,
    supabaseKey || fallbackSupabaseKey
);
