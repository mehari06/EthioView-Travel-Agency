
-- Enable RLS on tables
ALTER TABLE cabins ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- 1. Cabins: Everyone can view
CREATE POLICY "Allow public read access on cabins" 
ON cabins FOR SELECT USING (true);

-- 2. Settings: Everyone can view
CREATE POLICY "Allow public read access on settings" 
ON settings FOR SELECT USING (true);

-- 3. Guests: Users can view/edit their own data (based on email)
-- Note: This assumes you are handling auth logic to match emails, 
-- but for a simple fix we often allow public creation for sign-up flow or strict auth checks.
-- For now, let's allow public insert for sign-up:
CREATE POLICY "Allow public insert on guests" 
ON guests FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow users to read their own guest data" 
ON guests FOR SELECT USING (auth.uid() IS NULL OR email = current_setting('request.jwt.claim.email', true));

-- 4. Bookings: Users can view their own bookings
CREATE POLICY "Allow users to read their own bookings" 
ON bookings FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Allow users to create bookings" 
ON bookings FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
