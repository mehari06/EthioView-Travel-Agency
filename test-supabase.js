import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing env vars");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
    console.log("Testing connection to:", supabaseUrl);
    const { data, error } = await supabase.from("cabins").select("id, name").limit(1);
    if (error) {
        console.error("Connection failed:", error.message);
    } else {
        console.log("Connection successful! Data:", data);
    }
}

test();
