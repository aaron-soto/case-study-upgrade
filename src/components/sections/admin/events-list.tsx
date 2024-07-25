import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Event, EventFilterTypes } from "@/types/Events";
import { Eye, Plus, Square, SquareCheck } from "lucide-react";
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
  const [isEditOpen, setEditOpen] = useState(false);

  const { isEventSelected, toggleEventSelection } = useAdminEventsStore();

  return (
    <>
      {adminPage ? (
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
                  <SquareCheck size={23} />
                ) : (
                  <Square size={23} />
                )}
              </Button>
              <Button variant="ghost" className="w-[40px]" size="icon">
                <Eye
                  size={20}
                  className={cn(
                    event.published ? "text-green-500/50" : "text-neutral-500"
                  )}
                />
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
        </div>
      ) : (
        <div
          className={cn(
            "flex items-center justify-between px-2 py-2.5 md:p-4 hover:bg-white/[2%] cursor-pointer",
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
                  <SquareCheck size={23} />
                ) : (
                  <Square size={23} />
                )}
              </Button>
              <Button variant="ghost" className="w-[40px]" size="icon">
                <Eye
                  size={20}
                  className={cn(
                    event.published ? "text-green-600" : "text-red-600/60"
                  )}
                />
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
        </div>
      )}
    </>
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
}

const EventsList = ({ type, adminPage = false }: EventsListProps) => {
  const [loading, setLoading] = useState(true);

  const { fetchEvents, eventsToday, eventsPast, eventsFuture } =
    useAdminEventsStore((state) => ({
      fetchEvents: state.fetchEvents,
      eventsToday: state.eventsToday,
      eventsPast: state.eventsPast,
      eventsFuture: state.eventsFuture,
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

  return (
    <div>
      <div
        className={cn(
          "px-2 py-1 mt-4 md:py-2",
          type === EventFilterTypes.TODAY && "bg-teal-600/50",
          type === EventFilterTypes.FUTURE && "bg-orange-400/40",
          type === EventFilterTypes.PAST && "bg-red-500/30"
        )}
      >
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
          eventsFuture.map((event) => (
            <EventListItem adminPage={adminPage} key={event.id} event={event} />
          ))
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
