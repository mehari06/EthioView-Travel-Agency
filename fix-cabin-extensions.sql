-- Fix cabin image file extensions from .jfif to .jpg
UPDATE cabins SET image = '/images/cabin2.jpg' WHERE id = 2;
UPDATE cabins SET image = '/images/cabin3.jpg' WHERE id = 3;
UPDATE cabins SET image = '/images/cabin4.jpg' WHERE id = 4;
UPDATE cabins SET image = '/images/cabin5.jpg' WHERE id = 5;

-- Fix any other .jfif extensions that might exist
UPDATE cabins SET image = REPLACE(image, '.jfif', '.jpg') WHERE image LIKE '%.jfif';
