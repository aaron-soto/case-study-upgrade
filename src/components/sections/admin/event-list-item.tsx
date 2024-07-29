"use client";

import { CircleAlert, Eye, EyeOff, Square, SquareCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Event } from "@/types/Events";
import { EventForm } from "@/components/sections/admin/event-form";
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
    <Dialog open={isEditOpen} modal={false} onOpenChange={setEditOpen}>
      <div
        className={cn(
          "flex items-center justify-between p-1 py-2.5 md:p-4 hover:bg-white/[2%] cursor-pointer",
          isEventSelected(event) && "bg-white/[5%] hover:bg-white/[5%]",
          !adminPage &&
            event.urgent &&
            "bg-yellow-500/10 hover:bg-yellow-500/10"
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

export default EventListItem;
