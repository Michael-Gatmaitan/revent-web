import { Button } from "@/components/ui/button";

const AppNav = () => {
  return (
    <nav className="fixed top-0 sm:px-2 lg:px-4 xl:px-8 py-4">
      <div className="w-[120px] h-[120px] bg-red-500"></div>

      <div className="flex gap-2">
        <Button variant="ghost">Items</Button>
        <Button variant="ghost">Forecast</Button>
        <Button variant="ghost">About</Button>
      </div>
    </nav>
  );
};

export default AppNav;
