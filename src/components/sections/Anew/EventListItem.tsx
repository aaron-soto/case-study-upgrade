"use client";

import { CircleAlert, Eye, EyeOff, Square, SquareCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Event } from "@/types/Events";
import EventForm from "@/components/sections/Anew/EventForm";
import { cn } from "@/lib/utils";
import { useAdminEventStore } from "@/stores/EventStore";

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
  const { isEventSelected, toggleEventSelection } = useAdminEventStore();

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
  const { togglePublishEvent } = useAdminEventStore();

  return (
    <Button
      variant="ghost"
      className="w-[40px]"
      onClick={() => togglePublishEvent(event.id)}
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
  const { isEventSelected, toggleEventSelection, togglePublishEvent } =
    useAdminEventStore();
  const [isEditOpen, setEditOpen] = useState(false);

  // Function to get the correct date considering time zone
  const getCorrectDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
  };

  const eventDate = getCorrectDate(event.date);

  const onEventAdded = () => {
    setEditOpen(false);
  };

  return (
    <Dialog open={isEditOpen} modal={false} onOpenChange={setEditOpen}>
      <div
        className={cn(
          "flex items-center justify-between p-1 py-2.5 md:p-4 hover:bg-white/[2%] cursor-pointer",
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
            {event.title}
            {event.urgent && (
              <CircleAlert className="ml-3 text-yellow-600" size={24} />
            )}
          </p>
          <p className=" text-sm text-gray-400 line-clamp-1">
            {event.description}
          </p>
        </div>
        <div className="flex gap-2 text-lg md:text-xl">
          <p className="font-bold">{eventDate.getDate()}</p>
          <p>{months[eventDate.getMonth()]}</p>
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
      <DialogContent>
        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>
        <EventForm event={event} onEventAdded={onEventAdded} />
      </DialogContent>
    </Dialog>
  );
};

export default EventListItem;
