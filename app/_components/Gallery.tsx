import Image from "next/image";

const images = [
    { src: "/ethiocabin/wenchi.jpg", alt: "Wenchi Crater Lake" },
    { src: "/ethiocabin/omotribe.jpg", alt: "Omo Valley Culture" },
    { src: "/ethiocabin/aksum.webp", alt: "Ancient Stele of Aksum" },
    { src: "/ethiocabin/gondar.webp", alt: "Fasil Ghebbi Castles" },
    { src: "/ethiocabin/tourist.webp", alt: "Happy Travelers" },
    { src: "/ethiocabin/harar.webp", alt: "Walled City of Harar" },
    { src: "/ethiocabin/awashpark.webp", alt: "Awash National Park Wildlife" },
    { src: "/ethiocabin/tour.jfif", alt: "Highland Adventures" },
    { src: "/ethiocabin/haileresort/adisabebahilton.webp", alt: "Hilton hotel Luxury Pool" },
    { src: "/ethiocabin/geralta.webp", alt: "Geralta Mountains" },
    { src: "/ethiocabin/addisababa.webp", alt: "Addis Ababa Skyline" },
    { src: "/ethiocabin/simienpark.webp", alt: "Simien Peaks" },
    { src: "/ethiocabin/cabin3.jfif", alt: "Relaxing Lodge Stay" },
    { src: "/ethiocabin/bale.webp", alt: "Endemic Wildlife" },
];

export default function Gallery() {
    return (
        <section className="section bg-slate-50">
            <div className="container-main">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
                    <div>
                        <h2 className="section-heading">Travel inspiration gallery</h2>
                        <p className="section-subheading">
                            A snapshot of landscapes, culture, and stays across Ethiopia.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {images.map((img, index) => (
                        <div key={index} className="relative h-44 md:h-52 lg:h-60 overflow-hidden rounded-2xl shadow-card group">
                            <Image
                                src={img.src}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                alt={img.alt}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                <p className="text-white text-sm font-semibold bg-slate-900/60 px-3 py-1 rounded-full">
                                    {img.alt}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
