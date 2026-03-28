import { render, screen } from "@testing-library/react";
import ReserveTourForm from "@/app/_components/ReserveTourForm";
import ReserveHotelForm from "@/app/_components/ReserveHotelForm";

jest.mock("react-dom", () => {
  const actual = jest.requireActual("react-dom");
  return {
    ...actual,
    useFormStatus: () => ({ pending: false }),
  };
});

jest.mock("@/app/_lib/actions", () => ({
  createTourBooking: jest.fn(),
}));

jest.mock("@/app/_lib/hotel-actions", () => ({
  createHotelBookingAction: jest.fn(),
}));

describe("Reservation forms", () => {
  it("shows tour login prompt when session is missing", () => {
    render(<ReserveTourForm tour={{ id: 1, price: 200 }} session={null} />);

    expect(screen.getByText("Please sign in to reserve your seat.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Login to Reserve" })).toBeInTheDocument();
  });

  it("shows tour booking form when session exists", () => {
    render(
      <ReserveTourForm
        tour={{ id: 1, price: 200 }}
        session={{ user: { email: "guest@example.com" } } as any}
      />
    );

    expect(screen.getByLabelText("Seats")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reserve Deposit" })).toBeInTheDocument();
  });

  it("shows hotel login prompt when session is missing", () => {
    render(
      <ReserveHotelForm
        packageData={{ id: 1, name: "Deluxe", price_per_night: 150, max_capacity: 2 }}
        session={null}
      />
    );

    expect(screen.getByText("Please sign in to book this package.")).toBeInTheDocument();
  });

  it("shows hotel booking form when session exists", () => {
    render(
      <ReserveHotelForm
        packageData={{ id: 1, name: "Deluxe", price_per_night: 150, max_capacity: 2 }}
        session={{ user: { email: "guest@example.com" } } as any}
      />
    );

    expect(screen.getByText("Check-in Date")).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Book Now" })).toBeInTheDocument();
  });
});
