import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function debugPersist() {
    console.log("Checking ID 1...");
    const { data: before } = await supabase.from("cabins").select("id, image").eq("id", 1).single();
    console.log("Before:", before.image);

    const newPath = before.image.replace("/ethiocabin/", "/images/");
    console.log("Updating to:", newPath);
    const { error } = await supabase.from("cabins").update({ image: newPath }).eq("id", 1);

    if (error) {
        console.error("Update error:", error.message);
    } else {
        console.log("Update reported success.");
    }

    const { data: after } = await supabase.from("cabins").select("id, image").eq("id", 1).single();
    console.log("After:", after.image);
}

debugPersist();
