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

async function checkPaths() {
    console.log("--- CABINS ---");
    const { data: cabins } = await supabase.from("cabins").select("id, name, image");
    console.log(cabins);

    console.log("\n--- TOURS ---");
    const { data: tours } = await supabase.from("tours").select("id, name, image");
    console.log(tours);

    console.log("\n--- DESTINATIONS (Discover Ethiopia) ---");
    const { data: destinations } = await supabase.from("destinations").select("id, name, image");
    console.log(destinations);
}

checkPaths();
