import { notFound } from "next/navigation";
import { eachDayOfInterval } from "date-fns";
import { supabase } from "./supabase";
import { Booking, Cabin, Guest, Settings, Tour, TourBooking } from "./types";

/////////////
// GET

export async function getCabin(id: number): Promise<Cabin> {
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    notFound();
  }

  return data as Cabin;
}

export async function getCabinPrice(id: number): Promise<{ regularPrice: number; discount: number }> {
  const { data, error } = await supabase
    .from("cabins")
    .select("regularPrice, discount")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
  }

  return data;
}

export async function getCabins(): Promise<Cabin[]> {
  const { data, error } = await supabase
    .from("cabins")
    .select("id, name, maxCapacity, regularPrice, discount, image")
    .order("name");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data as Cabin[];
};

export async function getGuest(email: string): Promise<Guest | null> {
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .eq("email", email)
    .single();

  return data as Guest | null;
}

export async function getBooking(id: number | string): Promise<Booking> {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not get loaded");
  }

  return data as Booking;
}

export async function getBookings(guestId: number): Promise<Booking[]> {
  const { data, error } = await supabase
    .from("bookings")
    .select(
      "id, created_at, start_date, end_date, num_nights, num_guests, total_price, guest_id, cabin_id, cabins(name, image)"
    )
    .eq("guest_id", guestId)
    .order("start_date");

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  const transformedData = data.map((item: any) => ({
    ...item,
    cabins: Array.isArray(item.cabins) ? item.cabins[0] : item.cabins,
  }));

  return transformedData as Booking[];
}

export async function getTourBookings(guestId: number): Promise<TourBooking[]> {
  const { data, error } = await supabase
    .from("tour_bookings")
    .select(
      "id, created_at, guest_id, num_guests, total_price, status, is_paid, order_date, tour_id, tours(name, image, duration_days)"
    )
    .eq("guest_id", guestId)
    .order("order_date", { ascending: false });

  if (error) {
    console.error(error);
    throw new Error("Tour bookings could not be loaded");
  }

  // Handle the case where tours might be returned as an array or object
  const transformedData = data.map((item: any) => ({
    ...item,
    tours: Array.isArray(item.tours) ? item.tours[0] : item.tours,
  }));

  return transformedData as TourBooking[];
}

export async function getBookedDatesByCabinId(cabinId: number): Promise<Date[]> {
  let today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const todayStr = today.toISOString();

  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("cabin_id", cabinId)
    .or(`start_date.gte.${todayStr},status.eq.checked-in`);

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  const bookedDates = data
    .map((booking: any) => {
      return eachDayOfInterval({
        start: new Date(booking.start_date),
        end: new Date(booking.end_date),
      });
    })
    .flat();

  return bookedDates;
}

export async function getSettings(): Promise<Settings> {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }

  return data as Settings;
}

export async function getCountries(): Promise<{ name: string; flag: string }[]> {
  try {
    const res = await fetch(
      "https://restcountries.com/v2/all?fields=name,flag"
    );
    const countries = await res.json();
    return countries;
  } catch {
    throw new Error("Could not fetch countries");
  }
}

export async function getDestinations(): Promise<any[]> {
  const { data, error } = await supabase
    .from("destinations")
    .select("*")
    .order("name");

  if (error) {
    console.error(error);
    throw new Error("Destinations could not be loaded");
  }

  return data;
}

export async function getTours(): Promise<Tour[]> {
  const { data, error } = await supabase
    .from("tours")
    .select("*")
    .order("name");

  if (error) {
    console.error(error);
    throw new Error("Tours could not be loaded");
  }

  return data as Tour[];
}

/////////////
// CREATE

export async function createGuest(newGuest: Partial<Guest>): Promise<Guest> {
  const { data, error } = await supabase.from("guests").insert([newGuest]).select().single();

  if (error) {
    console.error(error);
    throw new Error("Guest could not be created");
  }

  return data as Guest;
}

/////////////
// HOTELS

export async function getHotels() {
  const { data, error } = await supabase
    .from("hotels")
    .select("*")
    .order("name");

  if (error) {
    console.error(error);
    throw new Error("Hotels could not be loaded");
  }

  return data;
}

export async function getHotel(id: number) {
  const { data, error } = await supabase
    .from("hotels")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}

export async function getHotelPackages(hotelId: number) {
  const { data, error } = await supabase
    .from("hotel_packages")
    .select("*")
    .eq("hotel_id", hotelId)
    .order("price_per_night");

  if (error) {
    console.error(error);
    throw new Error("Hotel packages could not be loaded");
  }

  return data;
}

export async function getHotelBookings(guestId: number) {
  const { data, error } = await supabase
    .from("hotel_bookings")
    .select("*, hotel_packages(*, hotels(*))")
    .eq("guest_id", guestId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    throw new Error("Hotel bookings could not be loaded");
  }

  return data;
}

export async function getHotelBooking(id: number) {
  const { data, error } = await supabase
    .from("hotel_bookings")
    .select(`
      *,
      hotel_packages (
        *,
        hotels (*)
      )
    `)
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}
