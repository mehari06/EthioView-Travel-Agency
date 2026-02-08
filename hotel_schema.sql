-- =====================================================
-- Hotel Reservation System Database Schema
-- =====================================================

-- 1. Create hotels table
CREATE TABLE IF NOT EXISTS hotels (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT,
  image TEXT,
  rating DECIMAL(2,1),
  created_at TIMESTAMP DEFAULT NOW()
);

-- 2. Create hotel_packages table
CREATE TABLE IF NOT EXISTS hotel_packages (
  id SERIAL PRIMARY KEY,
  hotel_id INTEGER REFERENCES hotels(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price_per_night DECIMAL(10,2) NOT NULL,
  max_capacity INTEGER NOT NULL,
  amenities TEXT[],
  image TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 3. Create hotel_bookings table
CREATE TABLE IF NOT EXISTS hotel_bookings (
  id SERIAL PRIMARY KEY,
  guest_id INTEGER REFERENCES guests(id) ON DELETE CASCADE,
  package_id INTEGER REFERENCES hotel_packages(id) ON DELETE CASCADE,
  check_in_date DATE NOT NULL,
  check_out_date DATE NOT NULL,
  num_guests INTEGER NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'confirmed',
  special_requests TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- Sample Data: Haile Resort Hawassa
-- =====================================================

-- Delete existing data to prevent duplicates when re-running script
DELETE FROM hotel_bookings WHERE package_id IN (SELECT id FROM hotel_packages WHERE hotel_id IN (SELECT id FROM hotels WHERE name = 'Haile Resort Hawassa'));
DELETE FROM hotel_packages WHERE hotel_id IN (SELECT id FROM hotels WHERE name = 'Haile Resort Hawassa');
DELETE FROM hotels WHERE name = 'Haile Resort Hawassa';

-- Insert Haile Resort and get the ID
DO $$
DECLARE
  haile_resort_id INTEGER;
BEGIN
  INSERT INTO hotels (name, location, description, image, rating)
  VALUES (
    'Haile Resort Hawassa',
    'Hawassa, Sidama',
    'Nestled on the shores of Lake Hawassa, our flagship partner resort offers unparalleled comfort, stunning lakeside views, and world-class amenities.',
    'https://ytreuzebgsogmyuxrzee.supabase.co/storage/v1/object/public/ethiocabin/Hawassa.png',
    4.8
  )
  RETURNING id INTO haile_resort_id;

  -- Insert Hotel Packages for Haile Resort using the actual hotel ID
  INSERT INTO hotel_packages (hotel_id, name, description, price_per_night, max_capacity, amenities, image)
  VALUES
    (
      haile_resort_id,
      'Deluxe Lake View Room',
      'Spacious room with panoramic views of Lake Hawassa, king-size bed, and private balcony.',
      180,
      2,
      ARRAY['Lake View', 'King Bed', 'Private Balcony', 'Mini Bar', 'WiFi', 'Air Conditioning'],
      '/ethiocabin/haileResort/haileResortHawassa (1).jpg'
    ),
    (
      haile_resort_id,
      'Executive Suite',
      'Luxurious suite with separate living area, premium amenities, and stunning lake views.',
      320,
      4,
      ARRAY['Lake View', 'Separate Living Room', 'King Bed', 'Sofa Bed', 'Jacuzzi', 'Mini Bar', 'WiFi', 'Air Conditioning', 'Coffee Machine'],
      '/ethiocabin/haileResort/haileResortHawassa (5).jpg'
    ),
    (
      haile_resort_id,
      'Family Garden Room',
      'Perfect for families, featuring two queen beds and access to garden terrace.',
      220,
      4,
      ARRAY['Garden View', 'Two Queen Beds', 'Garden Access', 'Mini Bar', 'WiFi', 'Air Conditioning'],
      '/ethiocabin/haileResort/haileResortHawassa (10).jpg'
    ),
    (
      haile_resort_id,
      'Standard Room',
      'Comfortable and affordable accommodation with modern amenities.',
      120,
      2,
      ARRAY['City View', 'Queen Bed', 'WiFi', 'Air Conditioning', 'TV'],
      '/ethiocabin/haileResort/haileResortHawassa (15).jpg'
    );
END $$;
