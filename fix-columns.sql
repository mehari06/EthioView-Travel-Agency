
-- Rename columns in 'cabins' to match the CamelCase used in the Next.js app
ALTER TABLE cabins RENAME COLUMN maxcapacity TO "maxCapacity";
ALTER TABLE cabins RENAME COLUMN regularprice TO "regularPrice";

-- Rename columns in 'settings'
ALTER TABLE settings RENAME COLUMN minbookinglength TO "minBookingLength";
ALTER TABLE settings RENAME COLUMN maxbookinglength TO "maxBookingLength";
ALTER TABLE settings RENAME COLUMN maxguestsperbooking TO "maxGuestsPerBooking";
ALTER TABLE settings RENAME COLUMN breakfastprice TO "breakfastPrice";

-- Rename columns in 'guests'
ALTER TABLE guests RENAME COLUMN fullname TO "fullName";
ALTER TABLE guests RENAME COLUMN nationalid TO "nationalID";
ALTER TABLE guests RENAME COLUMN countryflag TO "countryFlag";

-- Rename columns in 'bookings'
ALTER TABLE bookings RENAME COLUMN startdate TO "startDate";
ALTER TABLE bookings RENAME COLUMN enddate TO "endDate";
ALTER TABLE bookings RENAME COLUMN numnights TO "numNights";
ALTER TABLE bookings RENAME COLUMN numguests TO "numGuests";
ALTER TABLE bookings RENAME COLUMN totalprice TO "totalPrice";
ALTER TABLE bookings RENAME COLUMN hasbreakfast TO "hasBreakfast";
ALTER TABLE bookings RENAME COLUMN ispaid TO "isPaid";
ALTER TABLE bookings RENAME COLUMN cabinid TO "cabinId";
ALTER TABLE bookings RENAME COLUMN guestid TO "guestId";
