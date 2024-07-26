import "./globals.css";

import Footer from "@/components/Footer";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Navbar from "@/components/navbar/navbar";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Case Study Phoenix",
  description: "Phoenix's favorite new coffee shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link rel="manifest" href="/favicon/manifest.json" />
        <meta name="theme-color" content="#000000" />
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
        <meta name="description" content="Phoenix's favorite new coffee shop" />
      </head>
      <body className={cn(inter.className, "dark relative")}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1 mt-[100px]">{children}</main>
          <Footer />
          <Toaster />
        </div>
      </body>
    </html>
  );
}
