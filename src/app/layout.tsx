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
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
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
