import { render, screen } from "@testing-library/react";
import CabinList from "@/app/_components/CabinList";
import { getCabins } from "@/app/_lib/data-service";
import { fallbackCabins } from "@/app/_lib/fallback-cabins";

jest.mock("@/app/_lib/data-service", () => ({
  getCabins: jest.fn(),
}));

jest.mock("@/app/_components/CabinCard", () => ({
  __esModule: true,
  default: ({ cabin }: any) => <div data-testid="cabin-card">{cabin.name}</div>,
}));

const mockGetCabins = getCabins as jest.MockedFunction<typeof getCabins>;

describe("CabinList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("filters cabins by medium capacity", async () => {
    mockGetCabins.mockResolvedValueOnce([
      { id: 1, name: "Small", maxCapacity: 2, regularPrice: 100, discount: 0, image: "" },
      { id: 2, name: "Medium", maxCapacity: 5, regularPrice: 150, discount: 0, image: "" },
      { id: 3, name: "Large", maxCapacity: 9, regularPrice: 210, discount: 0, image: "" },
    ] as any);

    const ui = await CabinList({ filter: "medium" });
    render(ui as any);

    expect(screen.getAllByTestId("cabin-card")).toHaveLength(1);
    expect(screen.getByText("Medium")).toBeInTheDocument();
  });

  it("uses fallback cabins when DB request fails", async () => {
    mockGetCabins.mockRejectedValueOnce(new Error("db down"));

    const ui = await CabinList({ filter: "all" });
    render(ui as any);

    expect(screen.getAllByTestId("cabin-card")).toHaveLength(fallbackCabins.length);
  });
});
