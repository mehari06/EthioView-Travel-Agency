import Image from "next/image";
import { UserGroupIcon, HomeIcon } from "@heroicons/react/24/solid";

interface HotelPackageCardProps {
    packageData: {
        id: number;
        name: string;
        description: string;
        price_per_night: number;
        max_capacity: number;
        amenities: string[];
        image: string;
    };
}

export default function HotelPackageCard({ packageData }: HotelPackageCardProps) {
    const { id, name, description, price_per_night, max_capacity, amenities, image } = packageData;

    // Robust image mapping to bypass DB update restrictions for the fresh assets
    const packageImages: { [key: number]: string } = {
        1: "/images/haile-resort/haile-2.jpg",
        2: "/images/haile-resort/haile-5.jpg",
        3: "/images/haile-resort/haile-10.jpg",
        4: "/images/haile-resort/haile-15.jpg",
    };

    const displayImage = packageImages[id] || (image?.startsWith("http")
        ? `/images/haile-resort/${image.split("/").pop()}`.replace(/%20/g, " ")
        : image) || "/images/haile-resort/haile-2.jpg";

    const safeAmenities = Array.isArray(amenities)
        ? amenities.filter((item) => typeof item === "string" && item.trim().length > 0)
        : [];

    return (
        <div className="card overflow-hidden grid grid-cols-1 lg:grid-cols-[2fr_3fr]">
            <div className="relative h-64 lg:h-auto">
                <Image
                    src={displayImage || "/images/haile-resort/haile-2.jpg"}
                    fill
                    alt={name}
                    className="object-cover"
                />
            </div>

            <div className="p-8 lg:p-10">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-2xl md:text-3xl text-slate-900 font-semibold">
                            {name}
                        </h3>
                        <p className="mt-2 text-slate-600">
                            {description}
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-6 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                        <UserGroupIcon className="h-5 w-5 text-brand-emerald-600" />
                        <span>Up to {max_capacity} guests</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <HomeIcon className="h-5 w-5 text-brand-emerald-600" />
                        <span>Premium bedding</span>
                    </div>
                </div>

                <div className="mb-6">
                    <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 mb-3">
                        Amenities
                    </h4>
                    {safeAmenities.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {safeAmenities.map((amenity, index) => (
                                <span
                                    key={index}
                                    className="tag"
                                >
                                    {amenity}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-slate-500">Amenities will be updated soon.</p>
                    )}
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-slate-100">
                    <div>
                        <span className="text-xs uppercase tracking-widest text-slate-500 block mb-1">
                            From
                        </span>
                        <span className="text-3xl font-semibold text-slate-900">
                            ${price_per_night}
                        </span>
                        <span className="text-slate-500 text-sm ml-2">/ night</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
