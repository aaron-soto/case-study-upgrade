"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useCallback, useEffect, useState } from "react";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface CaseStudyImageProps {
  src: string;
  alt: string;
  className?: string;
  width: number;
  height: number;
}

const CaseStudyImage: React.FC<CaseStudyImageProps> = ({
  src,
  alt,
  className,
  width,
  height,
}) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

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
    <Dialog modal={false}>
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
