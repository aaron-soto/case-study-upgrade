import { ChevronDown, ChevronUp } from "lucide-react";
import { getIntervalForEvent, useEventStore } from "@/stores/EventStore";

import { Button } from "@/components/ui/button";
import EmptyState from "@/components/sections/Anew/event-empty-state";
import EventListItem from "@/components/sections/Anew/EventListItem";
import EventsHeader from "@/components/sections/Anew/EventsHeader";
import { Interval } from "@/types/Events";
import { useState } from "react";

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
  const { events } = useEventStore((state) => ({
    events: state.events,
  }));

  if (!adminPage && interval === Interval.PAST) {
    return null;
  }

  const filteredEvents = events.filter(
    (eve) => getIntervalForEvent(eve) === interval
  );

  const eventsToShow = showAll
    ? filteredEvents
    : filteredEvents.slice(0, limit);

  return (
    <div>
      <EventsHeader interval={interval} adminPage={adminPage} />
      {filteredEvents.length > 0 ? (
        <>
          {eventsToShow.map((event, idx) => (
            <EventListItem key={idx} adminPage={adminPage} event={event} />
          ))}
          {filteredEvents.length > limit && (
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
        </>
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default EventListInterval;
