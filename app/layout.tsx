import "./_styles/globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { ReservationProvider } from "./_components/ReservationContext";

export const metadata = {
  title: {
    template: "%s / Ethioview Travel Agency",
    default: "Welcome / Ethioview Travel Agency",
  },
  description:
    "Luxurious eco-lodges and curated tours in the heart of the Ethiopian Highlands. Discover ancient history and natural wonders with the premier travel agency in Ethiopia.",
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
