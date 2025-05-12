import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import AppIcon from "@/public/app_icon.png";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Label } from "@radix-ui/react-label";
import {
  ArrowLeftRight,
  ArrowUpFromDot,
  BadgeDollarSign,
  CirclePlus,
  ScanQrCode,
  ShoppingBasket,
  Star,
} from "lucide-react";

import Link from "next/link";
import ToggleModes from "./mode-toggle";
import Image from "next/image";

const items = [
  {
    id: 0,
    title: "QR Actions",
    children: [
      {
        id: 0,
        title: "Scan QR Code",
        icon: ScanQrCode,
        href: "/qr",
      },
      {
        id: 1,
        title: "Item-IN",
        icon: CirclePlus,
        href: "/qr/in",
      },
      {
        id: 2,
        title: "Item-OUT",
        icon: ArrowUpFromDot,
        href: "/qr/out",
      },
    ],
  },
  {
    id: 1,
    title: "View",
    children: [
      {
        id: 0,
        title: "Items",
        icon: ShoppingBasket,
        href: "/items",
      },
      {
        id: 1,
        title: "Forecasting",
        icon: Star,
        href: "/forecasting",
      },
      {
        id: 2,
        title: "Sales",
        icon: BadgeDollarSign,
        href: "/sales",
      },
      {
        id: 3,
        title: "Transactions",
        icon: ArrowLeftRight,
        href: "/transactions",
      },
    ],
  },
];

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex gap-2 items-center">
          {/* <Smile /> */}
          <Image src={AppIcon} width={50} height={50} alt="App icon" />
          <div className="font-bold text-3xl">Revent</div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel></SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem className="px-2 flex align-center gap-2">
                <ToggleModes />
                <Label htmlFor="switch-mode">Switch mode</Label>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {items.map((item) => (
          <Collapsible defaultOpen className="group/collapsible" key={item.id}>
            <SidebarGroup>
              <SidebarGroupLabel>
                <CollapsibleTrigger>{item.title}</CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  {item.children.map((child) => (
                    <SidebarMenu key={child.id}>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <Link href={child.href}>
                            <child.icon />
                            <span>{child.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  ))}
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
