import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollTriggerCleanup from "@/components/common/ScrollTriggerCleanup";

export const metadata: Metadata = {
  title: "TruckBilty - Bilty and Transport Management Software",
  description: "User-friendly Easy to use Mobile and web application for Transport Business, Manage your ducuments, Consignments, Loading Slip, Invoices and more.",
  keywords: "Transport Management, Logistics Software, Bilty Management, Loading Slip Software, Consignment Tracking, Manage Transport Account, Fleet Management, Delivery Scheduling, Transport Invoicing, Mobile Transport App, Web Transport App",
  icons: {
    icon: "/images/logo/Truck Bilty-05.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <ScrollTriggerCleanup>
          <Navigation />
          {children}
          <Footer />
        </ScrollTriggerCleanup>
      </body>
    </html>
  );
}
