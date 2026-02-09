import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function updateHotelPackages() {
    console.log("Updating hotel_packages image paths...");

    const packages = [
        { id: 1, image: "/images/haile-resort/haile-2.jpg" },
        { id: 2, image: "/images/haile-resort/haile-5.jpg" },
        { id: 3, image: "/images/haile-resort/haile-10.jpg" },
        { id: 4, image: "/images/haile-resort/haile-15.jpg" },
    ];

    for (const p of packages) {
        const { error } = await supabase
            .from("hotel_packages")
            .update({ image: p.image })
            .eq("id", p.id);

        if (error) {
            console.error(`Error updating package ${p.id}:`, error);
        } else {
            console.log(`Updated package ${p.id} to ${p.image}`);
        }
    }

    console.log("Hotel packages update complete!");
}

updateHotelPackages();
