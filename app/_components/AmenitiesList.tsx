import {
    WifiIcon,
    TvIcon,
    MapIcon,
    HomeIcon,
    SunIcon,
    FireIcon,
    SwatchIcon,
    SparklesIcon
} from "@heroicons/react/24/outline";

export default function AmenitiesList() {
    const amenities = [
        { icon: WifiIcon, title: "Satellite WiFi", text: "High-speed Starlink connectivity in all rooms." },
        { icon: TvIcon, title: "Premium TV", text: "Global news and entertainment channels." },
        { icon: MapIcon, title: "Guided Trekking", text: "Complimentary daily guided mountain walks." },
        { icon: HomeIcon, title: "Room Service", text: "24/7 authentic Ethiopian and Western dining." },
        { icon: SunIcon, title: "Solar Power", text: "Ecofriendly 24/7 renewable energy source." },
        { icon: FireIcon, title: "Fireplace", text: "Traditional wood-burning hearth in every room." },
        { icon: SwatchIcon, title: "Spa Access", text: "Traditional sauna and massage treatments." },
        { icon: SparklesIcon, title: "Coffee Ritual", text: "Authentic Ethiopian coffee ceremony daily." },
    ];

    return (
        <div className="mt-16 mb-16">
            <h3 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-10">
                Lodge amenities & guest services
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {amenities.map((item, index) => (
                    <div key={index} className="card p-5">
                        <div className="h-12 w-12 rounded-2xl bg-brand-emerald-50 flex items-center justify-center mb-4">
                            <item.icon className="h-6 w-6 text-brand-emerald-600" />
                        </div>
                        <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-600 mb-2">
                            {item.title}
                        </h4>
                        <p className="text-sm text-slate-600 leading-relaxed">{item.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
