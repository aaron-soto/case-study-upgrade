import {
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Square,
  SquareCheck,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Event, EventFilterTypes } from "@/types/Events";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { EventForm } from "@/components/sections/admin/event-form";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useAdminEventsStore } from "@/stores/AdminEventsStore";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

interface EventListItemProps {
  event: Event;
  adminPage?: boolean;
}

const EventListItem = ({ event, adminPage }: EventListItemProps) => {
  const eventDate = new Date(event.date);
  const day = eventDate.getDate();
  const month = months[eventDate.getMonth()];
  const { isEventSelected, toggleEventSelection, togglePublishEvent } =
    useAdminEventsStore();
  const [isEditOpen, setEditOpen] = useState(false);

  return (
    <Dialog open={isEditOpen} onOpenChange={setEditOpen}>
      <div
        className={cn(
          "flex items-center justify-between p-1 py-2.5 md:p-4 hover:bg-white/[2%] cursor-pointer",
          isEventSelected(event) && "bg-white/[5%] hover:bg-white/[5%]"
        )}
      >
        {adminPage && (
          <div className="flex gap-2 mr-2">
            <Button
              variant="ghost"
              onClick={() => toggleEventSelection(event)}
              className="w-[40px]"
              size="icon"
            >
              {isEventSelected(event) ? (
                <SquareCheck size={24} />
              ) : (
                <Square size={24} />
              )}
            </Button>
            <Button
              variant="ghost"
              className="w-[40px]"
              onClick={(e) => {
                e.stopPropagation();
                togglePublishEvent(event.id);
              }}
              size="icon"
            >
              {event.published ? (
                <Eye
                  size={24}
                  className={cn(
                    event.published ? "text-white" : "text-neutral-500"
                  )}
                />
              ) : (
                <EyeOff
                  size={24}
                  className={cn(
                    event.published ? "text-white" : "text-neutral-500"
                  )}
                />
              )}
            </Button>
          </div>
        )}
        <div className="mr-auto">
          <p className="text-base font-bold line-clamp-1">{event.title}</p>
          <p className=" text-sm text-gray-400 line-clamp-1">
            {event.description}
          </p>
        </div>
        <div className="flex gap-2 text-lg md:text-xl">
          <p className="font-bold">{day}</p>
          <p>{month}</p>
        </div>
        {adminPage && (
          <Button
            variant="outline"
            className="ml-4"
            onClick={() => setEditOpen(true)}
          >
            Edit
          </Button>
        )}
      </div>
      <DialogContent className="w-full max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
        </DialogHeader>
        <EventForm initialData={event} />
      </DialogContent>
    </Dialog>
  );
};

const EmptyState = () => (
  <div className="flex items-center justify-center h-20 bg-stone-900/20">
    <p className="text-base text-gray-500">No events today :(</p>
  </div>
);

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

interface EventsListProps {
  type: EventFilterTypes;
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
    if (type === EventFilterTypes.FUTURE && limit) {
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
          type === EventFilterTypes.TODAY && "bg-teal-600/50",
          type === EventFilterTypes.FUTURE && "bg-orange-400/40",
          type === EventFilterTypes.PAST && "bg-red-500/30"
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
        {type === EventFilterTypes.TODAY
          ? "Today"
          : type === EventFilterTypes.FUTURE
          ? "Upcoming"
          : "Past Events"}
      </div>
      <div className="divide-y">
        {loading ? (
          <LoadingState />
        ) : type === EventFilterTypes.TODAY && eventsToday.length > 0 ? (
          eventsToday.map((event) => (
            <EventListItem adminPage={adminPage} key={event.id} event={event} />
          ))
        ) : type === EventFilterTypes.FUTURE && eventsFuture.length > 0 ? (
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
        ) : type === EventFilterTypes.PAST && eventsPast.length > 0 ? (
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
