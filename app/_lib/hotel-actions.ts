"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "./auth";
import { supabase } from "./supabase";
import { getHotelBooking } from "./data-service";

export async function createHotelBookingAction(formData: FormData) {
    const session = await auth();
    if (!session) throw new Error("You must be logged in to book a hotel");

    const packageId = Number(formData.get("packageId"));
    const checkInDate = formData.get("checkInDate") as string;
    const checkOutDate = formData.get("checkOutDate") as string;
    const numGuests = Number(formData.get("numGuests"));
    const totalPrice = Number(formData.get("totalPrice"));
    const specialRequests = formData.get("specialRequests") as string;

    const newBooking = {
        guest_id: session.user.guestId,
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
        throw new Error("Hotel booking could not be created");
    }

    revalidatePath("/account/hotel-bookings");
    redirect("/account/hotel-bookings");
}

export async function deleteHotelBookingAction(bookingId: number) {
    const session = await auth();
    if (!session) throw new Error("You must be logged in");

    // Verify the booking belongs to the user
    const booking = await getHotelBooking(bookingId);
    if (booking.guest_id !== session.user.guestId) {
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
    if (!session) throw new Error("You must be logged in");

    const bookingId = Number(formData.get("bookingId"));

    // Verify the booking belongs to the user
    const booking = await getHotelBooking(bookingId);
    if (booking.guest_id !== session.user.guestId) {
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
        throw new Error("Hotel booking could not be updated");
    }

    revalidatePath(`/account/hotel-bookings`);
    redirect("/account/hotel-bookings");
}
