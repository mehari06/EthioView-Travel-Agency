"use client";

import Link from "next/link";
import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import SignOutButton from "./SignOutButton";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    name: "Home",
    href: "/account",
    icon: <HomeIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Reservations",
    href: "/account/reservations",
    icon: <HomeIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "My Tours",
    href: "/account/tours",
    icon: <CalendarDaysIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Hotel Bookings",
    href: "/account/hotel-bookings",
    icon: <HomeIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Guest profile",
    href: "/account/profile",
    icon: <UserIcon className="h-5 w-5 text-primary-600" />,
  },
];

function SideNavigation() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-primary-900 lg:border-b-0 lg:border-r">
      <ul className="flex flex-row flex-wrap lg:flex-col gap-2 h-full text-base lg:text-lg">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              className={`py-2 px-4 lg:py-3 lg:px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-3 font-semibold text-primary-200 ${pathname === link.href ? "bg-primary-900" : ""
                }`}
              href={link.href}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          </li>
        ))}

        <li className="lg:mt-auto w-full lg:w-auto">
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}

export default SideNavigation;
