-- =====================================================
-- DROP AND RECREATE Hotel Tables with Correct Schema
-- =====================================================

-- Drop tables in correct order (reverse of dependencies)
DROP TABLE IF EXISTS hotel_bookings CASCADE;
DROP TABLE IF EXISTS hotel_packages CASCADE;
DROP TABLE IF EXISTS hotels CASCADE;

-- Now run the hotel_schema.sql script to recreate everything
