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
import {
  ArrowUpFromDot,
  CirclePlus,
  ScanQrCode,
  ShoppingBasket,
} from "lucide-react";

import Link from "next/link";

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
    ],
  },
];

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader>Michael Gatmaitan</SidebarHeader>
      <SidebarContent>
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
