import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function debugUpdate() {
    const { data, error, status, statusText } = await supabase
        .from("cabins")
        .update({ image: "/images/aregash-lodge.jpg" })
        .eq("id", 1)
        .select();

    console.log("Status:", status);
    console.log("StatusText:", statusText);
    console.log("Error:", error);
    console.log("Data:", data);
}

debugUpdate();
