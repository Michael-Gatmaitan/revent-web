"use client";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const AppNavMenuToggle = () => {
  const { openMobile, setOpenMobile } = useSidebar();
  const pathname = usePathname();

  useEffect(() => {
    setOpenMobile(false);
  }, [pathname, setOpenMobile]);

  return (
    <Button onClick={() => setOpenMobile(!openMobile)} variant="outline">
      <Menu />
    </Button>
  );
};

export default AppNavMenuToggle;
