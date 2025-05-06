import type { Metadata } from "next";
import "./globals.css";
import { Playfair_Display, Poppins } from "next/font/google";
import { ThemeProvider } from "@/lib/theme-provider";
// import AppNav from "./components/app-nav";
import { Toaster } from "sonner";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./components/app-sidebar";
import StoreProvider from "@/lib/store-provider";
import AppNav from "./components/app-nav";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Revent | With Product Forecasting",
  description:
    "Revent is a project where given legacy system used to forecast products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} ${playfairDisplay.style} antialiased`}
      >
        <StoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider>
              <AppSidebar />
              <AppNav />
              <main className="w-full p-3 md:p-4">{children}</main>
              <Toaster />
            </SidebarProvider>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
