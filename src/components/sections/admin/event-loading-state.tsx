import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const LoadingState = () => (
  <div className="flex items-center justify-between p-4 h-[75px] bg-stone-900/20">
    <div className="flex flex-col gap-2">
      <Skeleton className="h-[19px] w-[100px]" />
      <Skeleton className="h-[19px] w-[300px]" />
    </div>
    <div className="flex gap-2">
      <Skeleton className="h-[19px] w-6" />
      <Skeleton className="h-[19px] w-12" />
    </div>
  </div>
);

export default LoadingState;
