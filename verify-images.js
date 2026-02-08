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
        const { data } = await supabase.from(table).select("id, name, image");

        for (const row of data) {
            if (!row.image) continue;

            const localPath = path.join(process.cwd(), "public", row.image);
            if (!fs.existsSync(localPath)) {
                console.log(`❌ BROKEN: ${table} "${row.name}" (ID ${row.id})`);
                console.log(`   Path: ${row.image}`);
                anyBroken = true;
            } else {
                // console.log(`✅ OK: ${row.name}`);
            }
        }
    }

    if (!anyBroken) {
        console.log("\n✨ ALL IMAGES VERIFIED SUCCESSFULLY!");
    } else {
        console.log("\n⚠️ Some images are still missing.");
    }
}

verify();
