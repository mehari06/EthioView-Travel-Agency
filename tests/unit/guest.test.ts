import { resolveGuestId } from "@/app/_lib/guest";
import { createGuest, getGuest } from "@/app/_lib/data-service";

jest.mock("@/app/_lib/data-service", () => ({
  getGuest: jest.fn(),
  createGuest: jest.fn(),
}));

const mockGetGuest = getGuest as jest.MockedFunction<typeof getGuest>;
const mockCreateGuest = createGuest as jest.MockedFunction<typeof createGuest>;

describe("resolveGuestId", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns null when session is missing", async () => {
    await expect(resolveGuestId(null)).resolves.toBeNull();
  });

  it("uses existing guestId from session without DB lookup", async () => {
    const session = {
      user: { guestId: 17, email: "guest@example.com", name: "Guest User" },
    } as any;

    await expect(resolveGuestId(session)).resolves.toBe(17);
    expect(mockGetGuest).not.toHaveBeenCalled();
    expect(mockCreateGuest).not.toHaveBeenCalled();
  });

  it("resolves guestId from existing guest record", async () => {
    mockGetGuest.mockResolvedValueOnce({
      id: 8,
      email: "guest@example.com",
      fullName: "Guest User",
    } as any);

    const session = {
      user: { guestId: 0, email: "guest@example.com", name: "Guest User" },
    } as any;

    await expect(resolveGuestId(session)).resolves.toBe(8);
    expect(mockGetGuest).toHaveBeenCalledWith("guest@example.com");
    expect(mockCreateGuest).not.toHaveBeenCalled();
  });

  it("creates guest when no guest record exists", async () => {
    mockGetGuest.mockResolvedValueOnce(null as any);
    mockCreateGuest.mockResolvedValueOnce({
      id: 11,
      email: "new@example.com",
      fullName: "New User",
    } as any);

    const session = {
      user: { guestId: 0, email: "new@example.com", name: "New User" },
    } as any;

    await expect(resolveGuestId(session)).resolves.toBe(11);
    expect(mockCreateGuest).toHaveBeenCalledWith({
      email: "new@example.com",
      fullName: "New User",
    });
  });

  it("returns null when DB calls fail", async () => {
    mockGetGuest.mockRejectedValueOnce(new Error("db unavailable"));

    const session = {
      user: { guestId: 0, email: "guest@example.com", name: "Guest User" },
    } as any;

    await expect(resolveGuestId(session)).resolves.toBeNull();
  });
});
