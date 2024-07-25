"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import { cn } from "@/lib/utils";

const CaseStudyImage = ({ src, alt, className, width, height }: any) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    // Check on initial render
    handleResize();

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isMobile) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
      />
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={className}
        />
      </DialogTrigger>
      <DialogContent className="w-full max-w-[1200px] flex items-center justify-center h-auto max-h-[90vh] p-0 m-auto">
        <div className="hidden">
          <DialogHeader></DialogHeader>
          <DialogTitle></DialogTitle>
        </div>
        <Image
          src={src}
          alt={alt}
          layout="responsive"
          width={800}
          height={600}
          className={cn("w-full h-auto")}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CaseStudyImage;
