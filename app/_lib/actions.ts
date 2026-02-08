"use server";

import { auth, signIn, signOut } from "./auth";
import { getBookings } from "./data-service";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateGuest(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID") as string;
  const nationalityData = formData.get("nationality") as string;
  const [nationality, countryFlag] = nationalityData.split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updateData = { nationality, countryFlag, nationalID };

  const { error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");

  revalidatePath("/account/profile");
}

export async function createBooking(bookingData: any, formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const newBooking = {
    guest_id: session.user.guestId,
    cabin_id: bookingData.cabinId,
    start_date: bookingData.startDate,
    end_date: bookingData.endDate,
    num_nights: bookingData.numNights,
    cabin_price: bookingData.cabinPrice,
    num_guests: Number(formData.get("numGuests")),
    observations: (formData.get("observations") as string).slice(0, 1000),
    extras_price: 0,
    total_price: bookingData.cabinPrice,
    is_paid: false,
    has_breakfast: false,
    status: "unconfirmed",
  };

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  revalidatePath(`/cabins/${bookingData.cabinId}`);

  redirect("/cabins/thankyou");
}

export async function deleteBooking(bookingId: number) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");

  revalidatePath("/account/reservations");
}

export async function updateBooking(formData: FormData) {
  const bookingId = Number(formData.get("bookingId"));

  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to update this booking");

  const updateData = {
    num_guests: Number(formData.get("numGuests")),
    observations: (formData.get("observations") as string).slice(0, 1000),
  };

  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) throw new Error("Booking could not be updated");

  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath("/account/reservations");

  redirect("/account/reservations");
}

export async function createTourBooking(tourData: any, formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const newBooking = {
    tour_id: tourData.id,
    guest_id: session.user.guestId,
    num_guests: Number(formData.get("numGuests") || 1),
    total_price: tourData.price * Number(formData.get("numGuests") || 1),
    status: "unconfirmed",
    is_paid: false,
    order_date: new Date().toISOString(),
  };

  const { error } = await supabase.from("tour_bookings").insert([newBooking]);

  if (error) {
    console.error(error);
    throw new Error("Tour booking could not be created");
  }

  revalidatePath("/tours");
  revalidatePath("/account/tours");

  redirect("/account/tours");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
