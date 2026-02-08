-- 1. Transform "The Imperial Road" (ID 1) into "Wenchi Crater Lake Trek"
UPDATE tours
SET
  name = 'Wenchi Crater Lake Trek',
  description = 'Hike through the stunning emerald crater lake and alpine vegetation.',
  image = 'https://ytreuzebgsogmyuxrzee.supabase.co/storage/v1/object/public/ethiocabin/Wenchi.jpg',
  price = 140,
  duration_days = 2,
  difficulty = 'Easy'
WHERE id = 1;

-- 2. Transform "Tiya" (ID 8) into "Abune Teklehaymanot Monasteries"
-- Renaming ID 8 to the requested monastery tour.
UPDATE tours
SET
  name = 'Hawassa saint Gebreiel  Monasteries',
  description = 'Explore the  it.',
  image = 'https://ytreuzebgsogmyuxrzee.supabase.co/storage/v1/object/public/ethiocabin/AbuneTeklehaymanot.jpg',
  price = 180,
  duration_days = 1
WHERE id = 8;

-- 3. Add "Hawassa" Destination (Preventing Duplicates)
DELETE FROM destinations WHERE name = 'Hawassa';
INSERT INTO destinations (name, region, description, image, highlights)
VALUES (
  'Hawassa',
  'Sidama',
  'The lakeside jewel of the Great Rift Valley.',
  'https://ytreuzebgsogmyuxrzee.supabase.co/storage/v1/object/public/ethiocabin/Hawassa.png',
  ARRAY['Lake Hawassa', 'Fish Market', 'Haile Resort']
);

-- 4. Add "Hawassa Lakes Trip" (Preventing Duplicates)
DELETE FROM tours WHERE name = 'Hawassa Lakes Trip';
INSERT INTO tours (name, price, duration_days, difficulty, description, image)
VALUES (
  'Hawassa Lakes Trip',
  550,
  3,
  'Easy',
  'Relaxation and wildlife at the beautiful Lake Hawassa.',
  'https://ytreuzebgsogmyuxrzee.supabase.co/storage/v1/object/public/ethiocabin/HawassaLake.jpg'
);
