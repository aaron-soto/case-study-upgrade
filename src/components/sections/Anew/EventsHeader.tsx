"use client";

import { Square, SquareCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Interval } from "@/types/Events";
import React from "react";
import { cn } from "@/lib/utils";
import { useAdminEventStore } from "@/stores/EventStore";

interface EventsHeaderProps {
  interval: Interval;
  adminPage: boolean;
}

const EventsHeader = ({ interval, adminPage }: EventsHeaderProps) => {
  const { isAllInIntervalSelected, toggleSelectAllEventsForInterval } =
    useAdminEventStore();

  return (
    <div
      className={cn(
        "px-2 py-1 mt-4 md:py-2 flex items-center",
        interval === Interval.TODAY && "bg-teal-600/50",
        interval === Interval.FUTURE && "bg-orange-400/40",
        interval === Interval.PAST && "bg-red-500/30"
      )}
    >
      {adminPage && (
        <Button
          variant="ghost"
          onClick={() => toggleSelectAllEventsForInterval(interval)}
          className="mx-2"
          size="icon"
        >
          {isAllInIntervalSelected(interval) ? (
            <SquareCheck size={24} />
          ) : (
            <Square size={24} />
          )}
        </Button>
      )}
      {interval === Interval.TODAY
        ? "Today"
        : interval === Interval.FUTURE
        ? "Upcoming"
        : "Past Events"}
    </div>
  );
};

export default EventsHeader;
