import { Button } from "@/components/ui/button";
import AppIcon from "../../public/app_icon.png";
import Image from "next/image";

const AppNav = () => {
  return (
    <nav className="fixed top-0 px-3 lg:px-4 xl:px-8 py-4 sm:flex md:hidden items-center z-[100] bg-black/70 backdrop-blur-sm w-screen">
      <div className="w-[50px] h-[50px]">
        <Image
          src={AppIcon}
          alt="app_icon"
          className="object-cover w-full h-full"
          width={50}
          height={50}
        />
      </div>
      <div className="flex gap-2">
        <Button variant="ghost">Items</Button>
        <Button variant="ghost">Forecast</Button>
        <Button variant="ghost">About</Button>
      </div>
    </nav>
  );
};

export default AppNav;
