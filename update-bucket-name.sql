
-- Update cabin image URLs to point to the new 'ethiocabin' bucket
UPDATE cabins
SET image = REPLACE(image, 'cabin-images', 'ethiocabin');
