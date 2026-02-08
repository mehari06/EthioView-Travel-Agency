export interface Cabin {
    id: number;
    name: string;
    maxCapacity: number;
    regularPrice: number;
    discount: number;
    image: string;
    description?: string;
}

export interface Guest {
    id: number;
    fullName: string;
    email: string;
    nationality?: string;
    nationalID?: string;
    countryFlag?: string;
}

export interface Booking {
    id: number;
    created_at: string;
    start_date: string;
    end_date: string;
    num_nights: number;
    num_guests: number;
    total_price: number;
    cabin_price: number;
    extras_price: number;
    status: string;
    has_breakfast: boolean;
    is_paid: boolean;
    observations: string;
    cabin_id: number;
    guest_id: number;
    cabins?: {
        name: string;
        image: string;
    };
}

export interface Tour {
    id: number;
    name: string;
    duration_days: number;
    price: number;
    difficulty: string;
    description: string;
    image: string;
}

export interface TourBooking {
    id: number;
    created_at: string;
    order_date: string;
    num_guests: number;
    total_price: number;
    status: string;
    is_paid: boolean;
    tour_id: number;
    guest_id: number;
    tours?: {
        name: string;
        image: string;
        duration_days: number;
    };
}

export interface Settings {
    id: number;
    minBookingLength: number;
    maxBookingLength: number;
    maxGuestsPerBooking: number;
    breakfastPrice: number;
}
