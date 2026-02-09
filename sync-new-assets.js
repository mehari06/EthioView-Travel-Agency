import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function updateDB() {
    console.log("Starting DB Update with new assets...");

    const cabins = [
        { id: 1, image: "/images/aregashlodge.jpg" },
        { id: 2, image: "/images/cabin2.jpg" },
        { id: 3, image: "/images/cabin3.jpg" },
        { id: 4, image: "/images/cabin4.jpg" },
        { id: 5, image: "/images/cabin5.jpg" },
    ];

    const tours = [
        { id: 1, image: "/images/wenchi.jpg" },
        { id: 2, image: "/images/dankil_depression.jpg" },
        { id: 3, image: "/images/geladababbon.jpg" },
        { id: 4, image: "/images/lalibela.jpg" },
        { id: 5, image: "/images/omoperson.jpg" },
        { id: 6, image: "/images/tisabay.jpg" },
        { id: 7, image: "/images/feedingofhyenainharrar.jpg" },
        { id: 8, image: "/images/hawassasaintgebrielmonstaery.jpg" },
        { id: 13, image: "/images/hawassalake.jpg" },
    ];

    const destinations = [
        { id: 1, image: "/images/aksum.jpg" },
        { id: 2, image: "/images/addisabeba.jpg" },
        { id: 3, image: "/images/lalibela.jpg" },
        { id: 4, image: "/images/omoperson.jpg" },
        { id: 5, image: "/images/harrarwall.jpg" },
        { id: 6, image: "/images/bahirdarcity.jpg" },
        { id: 11, image: "/images/hawassa.png" },
    ];

    for (const c of cabins) {
        await supabase.from("cabins").update({ image: c.image }).eq("id", c.id);
    }
    for (const t of tours) {
        await supabase.from("tours").update({ image: t.image }).eq("id", t.id);
    }
    for (const d of destinations) {
        await supabase.from("destinations").update({ image: d.image }).eq("id", d.id);
    }

    console.log("DB Update complete!");
}

updateDB();
