import { ReactNode } from "react";
import SideNavigation from "../_components/SideNavigation";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="container-main py-8 lg:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-[16rem_1fr] h-full gap-6 lg:gap-12">
        <SideNavigation />
        <div className="py-1">{children}</div>
      </div>
    </div>
  );
}
