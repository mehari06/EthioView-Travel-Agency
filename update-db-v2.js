import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateDB() {
    const tables = ["cabins", "tours", "destinations"];

    for (const table of tables) {
        console.log(`\n--- ${table} ---`);
        const { data, error } = await supabase.from(table).select("id, image");

        if (error) {
            console.error(`Error:`, error.message);
            continue;
        }

        for (const row of data) {
            if (row.image && row.image.includes("/ethiocabin/")) {
                const newPath = row.image.replace("/ethiocabin/", "/images/");
                console.log(`Updating ${row.id}: ${row.image} -> ${newPath}`);
                const { error: upError } = await supabase.from(table).update({ image: newPath }).eq("id", row.id);
                if (upError) console.error("Update failed:", upError.message);
            }
            if (row.image && row.image.includes("/hotels/")) {
                const newPath = row.image.replace("/hotels/", "/images/");
                console.log(`Updating ${row.id}: ${row.image} -> ${newPath}`);
                const { error: upError } = await supabase.from(table).update({ image: newPath }).eq("id", row.id);
                if (upError) console.error("Update failed:", upError.message);
            }
        }
    }
}

updateDB();
