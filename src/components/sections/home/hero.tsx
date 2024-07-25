import { Button, buttonVariants } from "@/components/ui/button";

import Image from "next/image";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { cn } from "@/lib/utils";

const playfairDisplay = Playfair_Display({ subsets: ["latin"] });

const HeroSection = () => {
  return (
    <div className="relative h-[45vh] overflow-hidden">
      <div className="fixed inset-0 w-full h-full -z-10">
        <Image
          src="/images/hero-front.png"
          alt="Hero background"
          fill
          quality={100}
          style={{ objectFit: "cover" }}
          className="w-full h-full"
        />
      </div>
      <div className="absolute inset-0 bg-black/40" />
      <div className="container relative z-10 flex flex-col items-baseline justify-center h-full">
        <h1 className="text-5xl font-[400]">
          Welcome to Case
          <span className="text-red-700">S</span>
          <span className="text-orange-700">t</span>
          <span className="text-orange-500">u</span>
          <span className="text-yellow-400">d</span>
          <span className="text-teal-600">y</span>
        </h1>
        <p
          className={cn(
            "mt-4 text-2xl tracking-wider",
            playfairDisplay.className
          )}
        >
          Phoenix&apos;s new favorite coffee lounge!
        </p>
        <div className="flex gap-2">
          <Link
            href="https://www.clover.com/online-ordering/william-douglas-co-phoenix"
            className={buttonVariants({
              variant: "outline",
              className:
                "px-8 py-2 mt-4 rounded-none bg-orange-400 border-orange-400 hover:bg-orange-300 hover:border-orange-300 backdrop-blur-sm",
            })}
          >
            Place an order
          </Link>
          <Button
            variant="outline"
            className="px-8 py-2 mt-4 border-orange-400 rounded-none hover:bg-orange-400 bg-black/40 backdrop-blur-md"
          >
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
