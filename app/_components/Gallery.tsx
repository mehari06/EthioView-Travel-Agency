import Image from "next/image";

const images = [
    { src: "/images/wenchi.jpg", alt: "Wenchi Crater Lake" },
    { src: "/images/feedingofhyenainharrar.jpg", alt: "Hyena Feeding in Harar" },
    { src: "/images/fasiledes.jpg", alt: "Fasiledes Castle in Gondar" },
    { src: "/images/aksumtsionchurch.jpg", alt: "St. Mary of Zion, Aksum" },
    { src: "/images/geladababbon.jpg", alt: "Gelada Baboon in Simien" },
    { src: "/images/aksum.jpg", alt: "Ancient Stele of Aksum" },
    { src: "/images/sofomercave.jpg", alt: "Sof Omar Cave" },
    { src: "/images/laketana.jpg", alt: "Lake Tana Monasteries" },
    { src: "/images/ethiotraditionaldish.jpg", alt: "Ethiopian Traditional Dish" },
    { src: "/images/waliaibex.jpg", alt: "Walia Ibex in Simien" },
    { src: "/images/lalibela.jpg", alt: "Rock-hewn Church, Lalibela" },
    { src: "/images/dankil_depression.jpg", alt: "Danakil Depression" },
    { src: "/images/bahirdarlaketana.jpg", alt: "Bahir Dar Lake" },
    { src: "/images/aregashlodge.jpg", alt: "Aregash Lodge" },
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
