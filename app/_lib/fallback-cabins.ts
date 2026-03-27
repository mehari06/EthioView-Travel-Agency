import { Cabin } from "./types";

export const fallbackCabins: Cabin[] = [
  {
    id: 1,
    name: "Aregash",
    maxCapacity: 2,
    regularPrice: 120,
    discount: 15,
    image: "/images/aregashlodge.jpg",
    description: "A peaceful lodge stay with panoramic highland views.",
  },
  {
    id: 2,
    name: "Simien View",
    maxCapacity: 3,
    regularPrice: 145,
    discount: 20,
    image: "/images/cabin2.jpg",
    description: "Comfortable lodge with easy access to nearby trails.",
  },
  {
    id: 3,
    name: "Mountain Hearth",
    maxCapacity: 5,
    regularPrice: 190,
    discount: 25,
    image: "/images/cabin3.jpg",
    description: "Warm interiors and a cozy fireplace for cool evenings.",
  },
  {
    id: 4,
    name: "Cliffside Retreat",
    maxCapacity: 7,
    regularPrice: 240,
    discount: 30,
    image: "/images/cabin4.jpg",
    description: "Spacious lodge for families and small groups.",
  },
  {
    id: 5,
    name: "Highland Grande",
    maxCapacity: 9,
    regularPrice: 295,
    discount: 35,
    image: "/images/cabin5.jpg",
    description: "Premium lodge experience with sweeping valley views.",
  },
];

export function getFallbackCabinById(id: number): Cabin | undefined {
  return fallbackCabins.find((cabin) => cabin.id === id);
}
