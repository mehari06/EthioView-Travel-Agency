import { getTours, getDestinations } from "./app/_lib/data-service";
import fs from "fs";

async function dumpData() {
    const tours = await getTours();
    const destinations = await getDestinations();
    const data = { tours, destinations };
    fs.writeFileSync("supabase_dump.json", JSON.stringify(data, null, 2));
    console.log("Data dumped to supabase_dump.json");
}

dumpData();
