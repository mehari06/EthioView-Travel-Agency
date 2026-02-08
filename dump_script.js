const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = 'https://ytreuzebgsogmyuxrzee.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0cmV1emViZ3NvZ215dXhyemVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkyNDMyMjQsImV4cCI6MjA4NDgxOTIyNH0.mQhf0CP_HdOAEFuI3Ep2Z-ZtfSLBzugPFTkQd0ynjEA';
const supabase = createClient(supabaseUrl, supabaseKey);

async function dumpData() {
    const { data: tours } = await supabase.from('tours').select('*');
    const { data: destinations } = await supabase.from('destinations').select('*');
    const data = { tours, destinations };
    fs.writeFileSync('supabase_dump.json', JSON.stringify(data, null, 2));
    console.log('Data dumped to supabase_dump.json');
}

dumpData();
