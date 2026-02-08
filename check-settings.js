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

async function checkSettings() {
    console.log("Checking settings table...");
    const { data, error } = await supabase.from("settings").select("*").single();

    if (error) {
        console.error("Error fetching settings:", error.message);
        const { data: allData } = await supabase.from("settings").select("*");
        console.log("All settings rows:", allData);
    } else {
        console.log("Settings found:", data);
    }
}

checkSettings();
