"use client";

import {
  CircleAlert,
  Eye,
  EyeOff,
  Pencil,
  Square,
  SquareCheck,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Event } from "@/app/api/events/types";
import EventForm from "@/components/sections/Anew/EventForm";
import { cn } from "@/lib/utils";
import { useAdminEventStore } from "@/stores/EventStore";
import { useEventsStore } from "@/stores/EventsStore";

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

const SelectButton = ({ event }: { event: Event }) => {
  const { isEventSelected, toggleEventSelection } = useEventsStore();

  return (
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
  );
};

const PublishButton = ({ event }: { event: Event }) => {
  const { toggleEventPublished } = useEventsStore();

  return (
    <Button
      variant="ghost"
      className="w-[40px]"
      onClick={() => toggleEventPublished(event.id)}
      size="icon"
    >
      {event.published ? <Eye size={24} /> : <EyeOff size={24} />}
    </Button>
  );
};

interface EventListItemProps {
  event: Event;
  adminPage?: boolean;
}

const EventListItem = ({ event, adminPage }: EventListItemProps) => {
  const { isEventSelected } = useEventsStore();
  const [isEditOpen, setEditOpen] = useState(false);

  // Function to get the correct date considering time zone
  const getCorrectDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
  };

  const eventDate = getCorrectDate(event.date);

  // Ensure valid numeric values for date display
  const eventDay = isNaN(eventDate.getDate()) ? "?" : eventDate.getDate();
  const eventMonth = isNaN(eventDate.getMonth())
    ? "?"
    : months[eventDate.getMonth()];

  const onEventAdded = () => {
    setEditOpen(false);
  };

  return (
    <Dialog open={isEditOpen} modal={false} onOpenChange={setEditOpen}>
      <div
        className={cn(
          "flex items-center border-b justify-between cursor-pointer hover:bg-white/[2%]",
          adminPage ? "p-1 py-2" : "p-1 py-2.5 md:p-4",
          isEventSelected(event) && "bg-white/[5%] hover:bg-white/[5%]"
        )}
      >
        {adminPage && (
          <div className="flex gap-2 mr-2">
            <SelectButton event={event} />
            <PublishButton event={event} />
          </div>
        )}
        <div className="mr-auto">
          <p className="text-base flex font-bold line-clamp-1">
            {event?.title}
            {event?.urgent && (
              <CircleAlert className="ml-3 text-yellow-600" size={24} />
            )}
          </p>
          <p className="text-sm text-gray-400 line-clamp-1">
            {event?.description}
          </p>
        </div>
        <div className="flex gap-2 text-lg md:text-xl">
          <p className="font-bold">{eventDay}</p>
          <p>{eventMonth}</p>
        </div>
        {adminPage && (
          <Button
            variant="outline"
            className="ml-4 aspect-square"
            onClick={() => setEditOpen(true)}
            size="icon"
          >
            <Pencil size={18} />
          </Button>
        )}
      </div>
      <DialogContent>
        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>
        <EventForm event={event} onEventAdded={onEventAdded} />
      </DialogContent>
    </Dialog>
  );
};

export default EventListItem;
