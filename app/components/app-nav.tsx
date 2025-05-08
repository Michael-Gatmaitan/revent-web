import { Button } from "@/components/ui/button";
// import AppIcon from "../../public/app_icon.png";
// import Image from "next/image";
import AppNavMenuToggle from "./app-nav-menu-toggle";

const AppNav = () => {
  return (
    <nav className="z-[10] fixed top-0 left-0 px-3 lg:px-4 xl:px-8 py-4 flex justify-between md:hidden items-center bg-primary/70 backdrop-blur-sm w-screen">
      <AppNavMenuToggle />

      <div className="flex gap-2">
        <Button variant="ghost">Items</Button>
        <Button variant="ghost">Forecast</Button>
        <Button variant="ghost">About</Button>
      </div>
    </nav>
  );
};

export default AppNav;
