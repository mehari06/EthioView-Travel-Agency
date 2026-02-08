import "./_styles/globals.css";
import Header from "./_components/Header";
import dynamic from "next/dynamic";

const Footer = dynamic(() => import("./_components/Footer"));
import { ReservationProvider } from "./_components/ReservationContext";

export const metadata = {
  title: {
    template: "%s / Ethioview Travel Agency",
    default: "Welcome / Ethioview Travel Agency",
  },
  description:
    "Luxurious eco-lodges and curated tours in the heart of the Ethiopian Highlands. Discover ancient history and natural wonders with the premier travel agency in Ethiopia.",
  metadataBase: new URL("https://ethio-view-travel-agency.vercel.app"),
  openGraph: {
    title: "Ethioview Travel Agency / Luxurious Eco-Lodges",
    description: "Discover the natural beauty and ancient history of Ethiopia with our premium travel services.",
    url: "https://ethio-view-travel-agency.vercel.app",
    siteName: "Ethioview Travel Agency",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ethioview Travel Agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ethioview Travel Agency",
    description: "Luxurious eco-lodges and curated tours in Ethiopia.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-gray-900 min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <ReservationProvider>{children}</ReservationProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}
