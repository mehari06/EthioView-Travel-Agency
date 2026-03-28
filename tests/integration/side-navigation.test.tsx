import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import SideNavigation from "@/app/_components/SideNavigation";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

jest.mock("@/app/_components/SignOutButton", () => ({
  __esModule: true,
  default: () => <button type="button">Sign out</button>,
}));

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

describe("SideNavigation", () => {
  it("highlights the active account route", () => {
    mockUsePathname.mockReturnValue("/account/tours");

    render(<SideNavigation />);

    const toursLink = screen.getByRole("link", { name: "My Tours" });
    expect(toursLink).toHaveClass("bg-primary-900");
  });

  it("renders all key account links", () => {
    mockUsePathname.mockReturnValue("/account");

    render(<SideNavigation />);

    expect(screen.getByRole("link", { name: "Reservations" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "My Tours" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Hotel Bookings" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Guest profile" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign out" })).toBeInTheDocument();
  });
});
