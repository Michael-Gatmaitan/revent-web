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
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  ArrowUpFromDot,
  CirclePlus,
  ScanQrCode,
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
      },
      {
        id: 1,
        title: "Item-IN",
        icon: CirclePlus,
      },
      {
        id: 2,
        title: "Item-OUT",
        icon: ArrowUpFromDot,
      },
    ],
  },
];

const AppSidebar = () => {
  return (
    <Sidebar>
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
                          <Link href="/">
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
