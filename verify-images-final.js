import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function verify() {
    const tables = ["cabins", "tours", "destinations"];
    let anyBroken = false;

    for (const table of tables) {
        console.log(`\nVerifying ${table}...`);
        const { data, error } = await supabase.from(table).select("id, name, image");

        if (error) {
            console.error(`Error fetching ${table}:`, error.message);
            continue;
        }

        for (const row of data) {
            if (!row.image) {
                console.log(`⚠️ MISSING IMAGE PATH: ${table} "${row.name}" (ID ${row.id})`);
                continue;
            }

            const localPath = path.join(process.cwd(), "public", row.image);
            if (!fs.existsSync(localPath)) {
                console.log(`❌ BROKEN: ${table} "${row.name}" (ID ${row.id})`);
                console.log(`   Path: ${row.image}`);
                anyBroken = true;
            } else {
                console.log(`✅ OK: ${row.name} -> ${row.image}`);
            }
        }
    }

    if (!anyBroken) {
        console.log("\n✨ ALL IMAGES VERIFIED SUCCESSFULLY IN /images/!");
    } else {
        console.log("\n⚠️ Some images are still missing.");
    }
}

verify();
