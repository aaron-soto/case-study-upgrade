import "./globals.css";

import { Event } from "@/app/api/events/types";
import { EventsProvider } from "@/app/api/events/EventsContext";
import Footer from "@/components/Footer";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Navbar from "@/components/navbar/navbar";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import { SiteSettings } from "@/app/api/site-settings/types";
import { SiteSettingsProvider } from "@/app/api/site-settings/SettingsContext";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { fetchAllEvents } from "@/app/api/events/util";
import { fetchSiteSettings } from "@/app/api/site-settings/utils";

const inter = Inter({ subsets: ["latin"] });

const APP_NAME = "Case Study";
const APP_DEFAULT_TITLE = "Case Study Phoenix";
const APP_TITLE_TEMPLATE = "%s - App";
const APP_DESCRIPTION = "Phoenix's favorite coffee shop!";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch initial settings and events data for providers
  const initialSettings = await fetchSiteSettings().then((data) => {
    return data as unknown as SiteSettings;
  });

  const initialEvents = await fetchAllEvents().then((data) => {
    return data as unknown as Event[];
  });

  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" href="/favicon/favicon.ico" />
        <link
          rel="icon"
          href="/favicon/favicon-32x32.png"
          sizes="32x32"
          type="image/png"
        />
        <link
          rel="icon"
          href="/favicon/favicon-16x16.png"
          sizes="16x16"
          type="image/png"
        />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
      </head>
      <body className={cn(inter.className, "dark relative")}>
        <SiteSettingsProvider initialSettings={initialSettings}>
          <EventsProvider initialEvents={initialEvents}>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1 mt-[100px]">{children}</main>
              <Footer />
              <Toaster />
              <ServiceWorkerRegister />
            </div>
          </EventsProvider>
        </SiteSettingsProvider>
      </body>
    </html>
  );
}
