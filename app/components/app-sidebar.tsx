import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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
  ArrowUpFromDot,
  CirclePlus,
  ScanQrCode,
  ShoppingBasket,
  Smile,
  Star,
} from "lucide-react";

import Link from "next/link";
import ToggleModes from "./mode-toggle";

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
        title: "Forcasting",
        icon: Star,
        href: "/forecasting",
      },
    ],
  },
];

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex gap-2">
          <Smile />
          <div>Michael Gatmaitan</div>
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
