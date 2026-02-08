import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 z-10 group">
      <Image
        src={logo}
        height="50"
        width="50"
        quality={100}
        alt="Ethioview Travel Agency logo"
        className="transition-transform group-hover:scale-105"
      />
      <div className="flex flex-col">
        <span className="text-xl font-semibold text-slate-900 tracking-tight font-display">
          Ethioview
        </span>
        <span className="text-xs text-slate-500 font-medium tracking-wide">
          Travel & Tours
        </span>
      </div>
    </Link>
  );
}

export default Logo;
