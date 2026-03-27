import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="z-10 w-full sm:w-auto">
      <ul className="flex flex-wrap gap-1 items-center justify-center sm:justify-end text-sm md:text-base">
        <li>
          <Link
            href="/destinations"
            className="px-4 py-2 text-slate-600 font-medium hover:text-slate-900 hover:bg-slate-50 rounded-full transition-all focus-visible:ring-2 focus-visible:ring-brand-emerald-500 focus-visible:ring-offset-2"
          >
            Destinations
          </Link>
        </li>
        <li>
          <Link
            href="/tours"
            className="px-4 py-2 text-slate-600 font-medium hover:text-slate-900 hover:bg-slate-50 rounded-full transition-all focus-visible:ring-2 focus-visible:ring-brand-emerald-500 focus-visible:ring-offset-2"
          >
            Tours
          </Link>
        </li>
        <li>
          <Link
            href="/hotels"
            className="px-4 py-2 text-slate-600 font-medium hover:text-slate-900 hover:bg-slate-50 rounded-full transition-all focus-visible:ring-2 focus-visible:ring-brand-emerald-500 focus-visible:ring-offset-2"
          >
            Hotels
          </Link>
        </li>
        <li>
          <Link
            href="/cabins"
            className="px-4 py-2 text-slate-600 font-medium hover:text-slate-900 hover:bg-slate-50 rounded-full transition-all focus-visible:ring-2 focus-visible:ring-brand-emerald-500 focus-visible:ring-offset-2"
          >
            Lodges
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="px-4 py-2 text-slate-600 font-medium hover:text-slate-900 hover:bg-slate-50 rounded-full transition-all focus-visible:ring-2 focus-visible:ring-brand-emerald-500 focus-visible:ring-offset-2"
          >
            About
          </Link>
        </li>
        <li className="ml-0 sm:ml-3">
          <Link href="/account" className="btn-primary px-5 py-2.5 text-sm">
            My Account
          </Link>
        </li>
      </ul>
    </nav>
  );
}
