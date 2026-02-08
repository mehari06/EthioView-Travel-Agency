import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing env vars!");
    console.log("URL:", supabaseUrl ? "Present" : "Missing");
    console.log("Key:", supabaseKey ? "Present" : "Missing");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function syncPaths() {
    const tables = ["cabins", "tours", "destinations"];

    for (const table of tables) {
        console.log(`\n--- Processing table: ${table} ---`);
        const { data, error } = await supabase.from(table).select("id, image");

        if (error) {
            console.error(`Error fetching ${table}:`, error);
            continue;
        }

        console.log(`Found ${data.length} rows.`);

        for (const row of data) {
            if (row.image) {
                const lowerImage = row.image.toLowerCase();
                if (row.image !== lowerImage) {
                    console.log(`Updating ID ${row.id}: ${row.image} -> ${lowerImage}`);
                    const { error: updateError } = await supabase
                        .from(table)
                        .update({ image: lowerImage })
                        .eq("id", row.id);

                    if (updateError) {
                        console.error(`Error updating ID ${row.id}:`, updateError.message);
                    }
                }
            }
        }
    }
    console.log("\nSuccess: Sync complete!");
}

syncPaths().catch(err => {
    console.error("Fatal error:", err);
});
