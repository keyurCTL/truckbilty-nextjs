import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollTriggerCleanup from "@/components/common/ScrollTriggerCleanup";

export const metadata: Metadata = {
  title: {
    default: 'TruckBilty - Bilty and Transport Management Software',
    template: '%s | TruckBilty - Bilty and Transport Management Software',
  },
  description: "User-friendly Easy to use Mobile and web application for Transport Business, Manage your ducuments, Consignments, Loading Slip, Invoices and more.",
  keywords: "Transport Management, Bilty Management, Consignment Tracking, Manage Transport Account, Fleet Management, Delivery Scheduling, Transport Invoicing, Mobile Transport App, Web Transport App",
  icons: {
    icon: "/images/logo/tb-favicon.svg",
  },
  applicationName: "TruckBilty",
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
