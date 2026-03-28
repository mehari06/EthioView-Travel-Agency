import { resolveGuestId } from "@/app/_lib/guest";
import { createGuest, getGuestIdsByEmail } from "@/app/_lib/data-service";

jest.mock("@/app/_lib/data-service", () => ({
  getGuestIdsByEmail: jest.fn(),
  createGuest: jest.fn(),
}));

const mockGetGuestIdsByEmail = getGuestIdsByEmail as jest.MockedFunction<typeof getGuestIdsByEmail>;
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
    expect(mockCreateGuest).not.toHaveBeenCalled();
  });

  it("resolves guestId from existing guest IDs", async () => {
    mockGetGuestIdsByEmail.mockResolvedValueOnce([8, 4]);

    const session = {
      user: { guestId: 0, email: "guest@example.com", name: "Guest User" },
    } as any;

    await expect(resolveGuestId(session)).resolves.toBe(8);
    expect(mockGetGuestIdsByEmail).toHaveBeenCalledWith("guest@example.com");
    expect(mockCreateGuest).not.toHaveBeenCalled();
  });

  it("creates guest when no guest record exists", async () => {
    mockGetGuestIdsByEmail.mockResolvedValueOnce([]);
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
    mockGetGuestIdsByEmail.mockRejectedValueOnce(new Error("db unavailable"));

    const session = {
      user: { guestId: 0, email: "guest@example.com", name: "Guest User" },
    } as any;

    await expect(resolveGuestId(session)).resolves.toBeNull();
  });
});
