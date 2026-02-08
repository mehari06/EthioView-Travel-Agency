import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkAll() {
    const { data: cabins } = await supabase.from("cabins").select("*");
    const { data: tours } = await supabase.from("tours").select("*");
    const { data: destinations } = await supabase.from("destinations").select("*");

    console.log("--- CABINS ---");
    cabins.forEach(c => console.log(`${c.id}: ${c.name} -> ${c.image}`));

    console.log("\n--- TOURS ---");
    tours.forEach(t => console.log(`${t.id}: ${t.name} -> ${t.image}`));

    console.log("\n--- DESTINATIONS ---");
    destinations.forEach(d => console.log(`${d.id}: ${d.name} -> ${d.image}`));
}

checkAll();
