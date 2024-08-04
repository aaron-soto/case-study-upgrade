import { ChevronDown, ChevronUp, Square, SquareCheck } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import EmptyState from "@/components/sections/Anew/event-empty-state";
import EventListItem from "@/components/sections/admin/event-list-item";
import { Interval } from "@/types/Events";
import LoadingState from "@/components/sections/admin/event-loading-state";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useAdminEventsStore } from "@/stores/AdminEventsStore";

interface EventsListProps {
  type: string;
  adminPage?: boolean;
  limit?: number;
}

const EventsList = ({ type, adminPage = false, limit }: EventsListProps) => {
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const {
    fetchEvents,
    eventsToday,
    eventsPast,
    eventsFuture,
    toggleAllEvents,
    isAllInCategorySelected,
  } = useAdminEventsStore((state) => ({
    fetchEvents: state.fetchEvents,
    eventsToday: state.eventsToday,
    eventsPast: state.eventsPast,
    eventsFuture: state.eventsFuture,
    toggleAllEvents: state.toggleAllEvents,
    isAllInCategorySelected: state.isAllInCategorySelected,
  }));

  const fetchEventsData = async () => {
    setLoading(true);
    try {
      await fetchEvents(type, !adminPage); // Fetch events with the published filter if not admin
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventsData();
  }, [type, adminPage]);

  const eventsToShow = () => {
    if (adminPage) {
      return showAll ? eventsFuture : eventsFuture;
    }
    if (type === Interval.FUTURE && limit) {
      return showAll ? eventsFuture : eventsFuture.slice(0, limit);
    }

    return [];
  };

  const handleToggleAll = () => {
    toggleAllEvents(type);
  };

  return (
    <div>
      <div
        className={cn(
          "px-2 py-1 mt-4 md:py-2 flex items-center",
          type === Interval.TODAY && "bg-teal-600/50",
          type === Interval.FUTURE && "bg-orange-400/40",
          type === Interval.PAST && "bg-red-500/30"
        )}
      >
        {adminPage && (
          <Button
            variant="ghost"
            onClick={handleToggleAll}
            className="mx-2"
            size="icon"
          >
            {isAllInCategorySelected(type) ? (
              <SquareCheck size={24} />
            ) : (
              <Square size={24} />
            )}
          </Button>
        )}
        {type === Interval.TODAY
          ? "Today"
          : type === Interval.FUTURE
          ? "Upcoming"
          : "Past Events"}
      </div>
      <div className="divide-y">
        {loading ? (
          <LoadingState />
        ) : type === Interval.TODAY && eventsToday.length > 0 ? (
          eventsToday.map((event) => (
            <EventListItem adminPage={adminPage} key={event.id} event={event} />
          ))
        ) : type === Interval.FUTURE && eventsFuture.length > 0 ? (
          <>
            {eventsToShow().map((event) => (
              <EventListItem
                adminPage={adminPage}
                key={event.id}
                event={event}
              />
            ))}
            {(limit && eventsFuture.length > limit) || !adminPage ? (
              <Button
                variant="link"
                onClick={() => setShowAll(!showAll)}
                className="w-full rounded-none pt-6"
              >
                {showAll ? (
                  <p className="flex items-center gap-2">
                    Show Less <ChevronUp size={24} />
                  </p>
                ) : (
                  <p className="flex items-center gap-2">
                    Show More <ChevronDown size={24} />
                  </p>
                )}
              </Button>
            ) : null}
          </>
        ) : type === Interval.PAST && eventsPast.length > 0 ? (
          eventsPast.map((event) => (
            <EventListItem adminPage={adminPage} key={event.id} event={event} />
          ))
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
};

export default EventsList;
