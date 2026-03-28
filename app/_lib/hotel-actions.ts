"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "./auth";
import { supabase } from "./supabase";
import { getHotelBooking } from "./data-service";
import { resolveGuestId } from "./guest";

export async function createHotelBookingAction(formData: FormData) {
    const session = await auth();
    if (!session) redirect("/login");
    const guestId = await resolveGuestId(session);
    if (!guestId) redirect("/account/profile?status=guest_unavailable");

    const packageId = Number(formData.get("packageId"));
    const checkInDate = formData.get("checkInDate") as string;
    const checkOutDate = formData.get("checkOutDate") as string;
    const numGuests = Number(formData.get("numGuests"));
    const totalPrice = Number(formData.get("totalPrice"));
    const specialRequests = formData.get("specialRequests") as string;

    const newBooking = {
        guest_id: guestId,
        package_id: packageId,
        check_in_date: checkInDate,
        check_out_date: checkOutDate,
        num_guests: numGuests,
        total_price: totalPrice,
        special_requests: specialRequests,
        status: "confirmed",
    };

    const { error } = await supabase.from("hotel_bookings").insert([newBooking]);

    if (error) {
        console.error(error);
        redirect("/hotels?status=booking_failed");
    }

    revalidatePath("/account/hotel-bookings");
    redirect("/account/hotel-bookings");
}

export async function deleteHotelBookingAction(bookingId: number) {
    const session = await auth();
    if (!session) redirect("/login");
    const guestId = await resolveGuestId(session);
    if (!guestId) redirect("/account/profile?status=guest_unavailable");

    // Verify the booking belongs to the user
    const booking = await getHotelBooking(bookingId);
    if (booking.guest_id !== guestId) {
        throw new Error("You are not authorized to delete this booking");
    }

    const { error } = await supabase
        .from("hotel_bookings")
        .delete()
        .eq("id", bookingId);

    if (error) {
        console.error(error);
        throw new Error("Hotel booking could not be deleted");
    }

    revalidatePath("/account/hotel-bookings");
}

export async function updateHotelBookingAction(formData: FormData) {
    const session = await auth();
    if (!session) redirect("/login");
    const guestId = await resolveGuestId(session);
    if (!guestId) redirect("/account/profile?status=guest_unavailable");

    const bookingId = Number(formData.get("bookingId"));

    // Verify the booking belongs to the user
    const booking = await getHotelBooking(bookingId);
    if (booking.guest_id !== guestId) {
        throw new Error("You are not authorized to update this booking");
    }

    const checkInDate = formData.get("checkInDate") as string;
    const checkOutDate = formData.get("checkOutDate") as string;
    const numGuests = Number(formData.get("numGuests"));
    const totalPrice = Number(formData.get("totalPrice"));
    const specialRequests = formData.get("specialRequests") as string;

    const updatedBooking = {
        check_in_date: checkInDate,
        check_out_date: checkOutDate,
        num_guests: numGuests,
        total_price: totalPrice,
        special_requests: specialRequests,
    };

    const { error } = await supabase
        .from("hotel_bookings")
        .update(updatedBooking)
        .eq("id", bookingId);

    if (error) {
        console.error(error);
        redirect("/account/hotel-bookings?status=update_failed");
    }

    revalidatePath(`/account/hotel-bookings`);
    redirect("/account/hotel-bookings");
}
