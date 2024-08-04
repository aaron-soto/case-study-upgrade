"use client";

import { Square, SquareCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Interval } from "@/types/Events";
import React from "react";
import { cn } from "@/lib/utils";
import { useAdminEventStore } from "@/stores/EventStore";
import { useEventsStore } from "@/stores/EventsStore";

interface EventsHeaderProps {
  interval: Interval;
  adminPage: boolean;
}

const EventsHeader = ({ interval, adminPage }: EventsHeaderProps) => {
  const { isAllInIntervalSelected, toggleSelectAllEventsForInterval } =
    useEventsStore();

  return (
    <div
      className={cn(
        "flex items-center",
        adminPage ? "px-2 mt-4" : "px-2 py-1 mt-4 md:py-2",
        interval === Interval.TODAY && "bg-teal-600/50",
        interval === Interval.FUTURE && "bg-orange-400/40",
        interval === Interval.PAST && "bg-red-500/30"
      )}
    >
      {adminPage && (
        <Button
          variant="ghost"
          onClick={() => toggleSelectAllEventsForInterval(interval)}
          className="-ml-1"
          size="icon"
        >
          {isAllInIntervalSelected(interval) ? (
            <SquareCheck size={24} />
          ) : (
            <Square size={24} />
          )}
        </Button>
      )}
      <span className="ml-2 text-white/60">
        {interval === Interval.TODAY
          ? "Today"
          : interval === Interval.FUTURE
          ? "Upcoming"
          : "Past Events"}
      </span>
    </div>
  );
};

export default EventsHeader;
