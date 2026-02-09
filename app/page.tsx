import Link from "next/link";
import Image from "next/image";
import bg from "@/public/bg.png";
import dynamic from "next/dynamic";

const Gallery = dynamic(() => import("./_components/Gallery").then(mod => ({ default: mod.default })));
import {
  CalendarDaysIcon,
  CheckBadgeIcon,
  GlobeAltIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  ShieldCheckIcon,
  SparklesIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const services = [
  {
    title: "Local Experts",
    text: "Travel with guides who grew up in the highlands and know every hidden trail.",
    icon: GlobeAltIcon,
  },
  {
    title: "Flexible Booking",
    text: "Reserve now, adjust later. We keep changes simple and transparent.",
    icon: CalendarDaysIcon,
  },
  {
    title: "Secure Trips",
    text: "Verified partners, vetted stays, and 24/7 support on every itinerary.",
    icon: ShieldCheckIcon,
  },
  {
    title: "Small Groups",
    text: "Boutique group sizes for authentic connections and a personal feel.",
    icon: UserGroupIcon,
  },
];

const steps = [
  {
    title: "Search destinations",
    text: "Browse curated routes, dates, and trip styles built by local experts.",
    icon: MagnifyingGlassIcon,
  },
  {
    title: "Choose your stay",
    text: "Pick lodges, resorts, or boutique hotels that fit your pace and budget.",
    icon: MapPinIcon,
  },
  {
    title: "Book with confidence",
    text: "Secure checkout with clear policies and live trip support.",
    icon: CheckBadgeIcon,
  },
];

const featuredDestinations = [
  {
    name: "Simien Mountains",
    region: "Highlands",
    image: "/images/geladababbon.jpg",
    description: "Dramatic ridgelines, rare wildlife, and sunrise treks above the clouds.",
  },
  {
    name: "Lalibela",
    region: "Historic North",
    image: "/images/lalibela.jpg",
    description: "Rock-hewn churches, ancient legends, and a deep cultural heartbeat.",
  },
  {
    name: "Danakil Depression",
    region: "Afar Region",
    image: "/images/dankil_depression.jpg",
    description: "One of the hottest and most colorful places on earth, a true geological wonder.",
  },
];

const cuisineImages = [
  { src: "/images/ethiotraditionaldish.jpg", alt: "Injera and Wot" },
  { src: "/images/ethiotraditionaldish2.jpg", alt: "Ethiopian Coffee" },
  { src: "/images/ethiotraditionaldish3.jpg", alt: "Spiced Flavors" },
  { src: "/images/ethiotraditionaldish4.jpg", alt: "Traditional Feast" },
];

const highlights = [
  {
    title: "Handpicked Stays",
    text: "Every lodge and resort is selected for comfort, location, and service.",
    icon: SparklesIcon,
  },
  {
    title: "Immersive Culture",
    text: "Coffee ceremonies, local guides, and meaningful connections.",
    icon: GlobeAltIcon,
  },
  {
    title: "Safety First",
    text: "Professional partners, clear policies, and in-trip support.",
    icon: ShieldCheckIcon,
  },
];

export default function Page() {
  return (
    <main className="bg-white">
      <section className="relative overflow-hidden">
        <div className="section pt-24 pb-10">
          <div className="container-main grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-emerald-50 px-4 py-2 text-sm font-semibold text-brand-emerald-700">
                <span className="h-2 w-2 rounded-full bg-brand-emerald-500" />
                Curated journeys across Ethiopia
              </div>
              <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-900 leading-tight">
                Discover Ethiopia with a modern travel experience.
              </h1>
              <p className="mt-6 text-lg text-slate-600 max-w-xl">
                Ethioview blends boutique comfort with authentic adventure. Book
                tours, lodges, and hotels in one place with local experts guiding
                every step.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/tours" className="btn-primary">
                  Explore tours
                </Link>
                <Link href="/destinations" className="btn-secondary">
                  Browse destinations
                </Link>
              </div>
              <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-600">
                <div>
                  <p className="text-slate-900 font-semibold">120+ trips</p>
                  <p>Curated itineraries</p>
                </div>
                <div>
                  <p className="text-slate-900 font-semibold">4.9/5 rating</p>
                  <p>Trusted by travelers</p>
                </div>
                <div>
                  <p className="text-slate-900 font-semibold">24/7 support</p>
                  <p>On every booking</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative h-[420px] md:h-[520px] rounded-3xl overflow-hidden shadow-card">
                <Image
                  src={bg}
                  fill
                  placeholder="blur"
                  quality={90}
                  className="object-cover"
                  alt="Ethiopian highlands landscape"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent" />
              </div>
              <div className="card absolute -bottom-8 left-6 right-6 md:left-10 md:right-auto md:w-[320px] p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Popular trip
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <p className="text-lg font-semibold text-slate-900">
                      Simien Peaks Escape
                    </p>
                    <p className="text-sm text-slate-600">5 days · Guided</p>
                  </div>
                  <span className="tag">From $580</span>
                </div>
              </div>
            </div>
          </div>

          <div className="container-main mt-16">
            <form
              action="/destinations"
              className="card p-4 md:p-6 grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr_auto] gap-4 items-end"
            >
              <div>
                <label className="input-label" htmlFor="hero-destination">
                  Destination
                </label>
                <input
                  id="hero-destination"
                  name="destination"
                  placeholder="Addis Ababa, Lalibela, Omo Valley"
                  className="input"
                />
              </div>
              <div>
                <label className="input-label" htmlFor="hero-dates">
                  Travel dates
                </label>
                <input
                  id="hero-dates"
                  name="dates"
                  placeholder="Apr 14 - Apr 21"
                  className="input"
                />
              </div>
              <div>
                <label className="input-label" htmlFor="hero-guests">
                  Travelers
                </label>
                <select id="hero-guests" name="guests" className="input">
                  <option value="1">1 traveler</option>
                  <option value="2">2 travelers</option>
                  <option value="4">4 travelers</option>
                  <option value="6">6 travelers</option>
                </select>
              </div>
              <button type="submit" className="btn-primary w-full md:w-auto">
                Search trips
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="section bg-slate-50">
        <div className="container-main">
          <div className="max-w-2xl">
            <h2 className="section-heading">Why travelers choose Ethioview</h2>
            <p className="section-subheading">
              Thoughtful planning, boutique stays, and local experts make every
              trip effortless.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <div key={service.title} className="card p-6">
                <div className="h-12 w-12 rounded-2xl bg-brand-emerald-50 flex items-center justify-center mb-5">
                  <service.icon className="h-6 w-6 text-brand-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{service.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-main">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2 className="section-heading">Featured destinations</h2>
              <p className="section-subheading">
                Explore landscapes that combine dramatic scenery and deep
                cultural heritage.
              </p>
            </div>
            <Link href="/destinations" className="btn-outline">
              View all destinations
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredDestinations.map((destination) => (
              <div key={destination.name} className="card overflow-hidden">
                <div className="relative h-56">
                  <Image
                    src={destination.image}
                    fill
                    alt={destination.name}
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-slate-900">
                      {destination.name}
                    </h3>
                    <span className="tag">{destination.region}</span>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">
                    {destination.description}
                  </p>
                  <div className="mt-4">
                    <Link href="/destinations" className="text-sm font-semibold text-brand-emerald-700 hover:text-brand-emerald-600">
                      Learn more
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-slate-50">
        <div className="container-main grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
          <div>
            <h2 className="section-heading">Book your journey in three steps</h2>
            <p className="section-subheading">
              Clear, guided steps make planning simple. Start with a destination
              and finish with a ready-to-go itinerary.
            </p>
            <div className="mt-10 space-y-6">
              {steps.map((step, index) => (
                <div key={step.title} className="card p-5 flex gap-4 items-start">
                  <div className="h-12 w-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-brand-emerald-600 font-semibold">
                    {(index + 1).toString().padStart(2, "0")}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-600 mt-1">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card p-8">
            <h3 className="text-xl font-semibold text-slate-900">
              What you get with every booking
            </h3>
            <ul className="mt-6 space-y-4 text-sm text-slate-600">
              <li className="flex gap-3 items-start">
                <CheckBadgeIcon className="h-5 w-5 text-brand-emerald-600 mt-0.5" />
                Curated stays with verified reviews and transparent pricing.
              </li>
              <li className="flex gap-3 items-start">
                <CheckBadgeIcon className="h-5 w-5 text-brand-emerald-600 mt-0.5" />
                Private guides and small groups for flexible pacing.
              </li>
              <li className="flex gap-3 items-start">
                <CheckBadgeIcon className="h-5 w-5 text-brand-emerald-600 mt-0.5" />
                Local support and travel updates before and during your trip.
              </li>
            </ul>
            <div className="mt-8">
              <Link href="/tours" className="btn-primary w-full">
                Start booking
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-main">
          <div className="max-w-2xl">
            <h2 className="section-heading">Travel with confidence</h2>
            <p className="section-subheading">
              Every detail is designed to keep you comfortable and informed.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlights.map((item) => (
              <div key={item.title} className="card p-6">
                <div className="h-12 w-12 rounded-2xl bg-brand-emerald-50 flex items-center justify-center mb-5">
                  <item.icon className="h-6 w-6 text-brand-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Gallery />

      <section className="section">
        <div className="container-main">
          <div className="rounded-3xl bg-brand-emerald-50 p-8 md:p-12 flex flex-col lg:flex-row gap-8 items-center">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-semibold text-slate-900">
                Get travel updates and early access to new routes.
              </h2>
              <p className="mt-4 text-slate-600">
                Join the Ethioview newsletter for seasonal offers and insider
                tips from our travel team.
              </p>
            </div>
            <form className="w-full max-w-md flex flex-col gap-3">
              <label className="sr-only" htmlFor="newsletter-email">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Enter your email"
                className="input"
              />
              <button type="submit" className="btn-primary w-full">
                Subscribe now
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
