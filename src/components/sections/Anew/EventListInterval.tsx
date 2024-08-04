import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import EmptyState from "@/components/sections/Anew/event-empty-state";
import EventListItem from "@/components/sections/Anew/EventListItem";
import EventsHeader from "@/components/sections/Anew/EventsHeader";
import { Interval } from "@/types/Events";
import LoadingState from "@/components/sections/Anew/event-loading-state";
import { getIntervalForEvent } from "@/app/api/events/util";
import { useEventsStore } from "@/stores/EventsStore";

interface EventListIntervalProps {
  interval: Interval;
  adminPage?: boolean;
  limit?: number;
}

const EventListInterval = ({
  interval,
  adminPage = false,
  limit = 5,
}: EventListIntervalProps) => {
  const [showAll, setShowAll] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const events = useEventsStore((state: any) => state.events);

  // Simulate a delay for loading state (e.g., fetching data)
  useEffect(() => {
    const fetchData = async () => {
      // Simulating network request
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate 1 second loading delay
      setIsLoading(false);
    };

    fetchData();
  }, [interval]);

  // Don't show past events on the home page
  if (!adminPage && interval === Interval.PAST) {
    return null;
  }

  // Check if events is an array before filtering
  const filteredEvents = Array.isArray(events)
    ? events.filter((eve) => getIntervalForEvent(eve) === interval)
    : [];

  // Determine which events to display
  const eventsToShow = adminPage
    ? filteredEvents
    : showAll
    ? filteredEvents
    : filteredEvents.slice(0, limit);

  // If no events exist, display the EmptyState component
  if (filteredEvents.length === 0) {
    return (
      <div>
        <EventsHeader interval={interval} adminPage={adminPage} />
        <EmptyState />
      </div>
    );
  }

  return (
    <div>
      <EventsHeader interval={interval} adminPage={adminPage} />
      {isLoading ? (
        <LoadingState />
      ) : (
        eventsToShow.map((event, idx) => (
          <EventListItem key={idx} adminPage={adminPage} event={event} />
        ))
      )}
      {!adminPage && filteredEvents.length > limit && (
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
      )}
    </div>
  );
};

export default EventListInterval;
