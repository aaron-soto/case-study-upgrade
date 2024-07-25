"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye, EyeOff, Plus, RefreshCcw, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { EventFilterTypes } from "@/types/Events";
import { EventForm } from "@/components/sections/admin/event-form";
import { useAdminEventsStore } from "@/stores/AdminEventsStore";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const EventsToolbar = () => {
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [publishAlertOpen, setPublishAlertOpen] = useState(false);
  const [unpublishAlertOpen, setUnpublishAlertOpen] = useState(false);
  const {
    selectedEvents,
    publishSelectedEvents,
    deleteSelectedEvents,
    fetchEvents,
  } = useAdminEventsStore();

  const handleDelete = () => {
    deleteSelectedEvents();
    setAlertOpen(false);
  };

  const triggerRefresh = () => {
    fetchEvents(EventFilterTypes.TODAY);
    fetchEvents(EventFilterTypes.PAST);
    fetchEvents(EventFilterTypes.FUTURE);
  };

  useEffect(() => {
    if (publishAlertOpen || unpublishAlertOpen) {
      // Perform any additional logic when alerts are opened
    }
  }, [publishAlertOpen, unpublishAlertOpen]);

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">Events</h1>
      <div className="flex items-center gap-4">
        {!isMobile && selectedEvents.length > 0 && (
          <>
            <Button
              variant="destructive"
              onClick={() => setAlertOpen(true)}
              className="rounded-none"
            >
              Delete ({selectedEvents.length}) Event
              {selectedEvents.length > 1 && "s"}
            </Button>

            <AlertDialog
              open={publishAlertOpen}
              onOpenChange={setPublishAlertOpen}
            >
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="rounded-none">
                  Publish
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Publish the selected events?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This will publish the selected events on the website
                    homepage.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setPublishAlertOpen(false)}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => publishSelectedEvents(true)}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog
              open={unpublishAlertOpen}
              onOpenChange={setUnpublishAlertOpen}
            >
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="rounded-none">
                  Unpublish
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Unpublish the selected events?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This will unpublish the selected events from the website
                    homepage.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel
                    onClick={() => setUnpublishAlertOpen(false)}
                  >
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => publishSelectedEvents(false)}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete your selected event(s) and
                    remove the event from the home page.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setAlertOpen(false)}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        )}
        <Button
          size="icon"
          variant="ghost"
          className="rounded-none"
          onClick={triggerRefresh}
        >
          <RefreshCcw size={30} />
        </Button>
        <Button variant="secondary" disabled className="rounded-none">
          Import Events
        </Button>

        {isMobile && (
          <div className="flex fixed gap-2 bottom-0 z-10 left-0 items-end right-0 p-2.5 pt-1 bg-[#0c0b09] border-t w-full">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="rounded-xl flex-1 bg-[#0D4F48] py-[28px] mb-8"
                  variant="secondary"
                >
                  <Plus size={30} className="text-[#4a9890]" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="mb-4">Add Event</DialogTitle>
                  <DialogDescription className="hidden">
                    Add events here that will show on the website.
                  </DialogDescription>
                </DialogHeader>
                <EventForm />
              </DialogContent>
            </Dialog>

            {selectedEvents.length > 0 && (
              <div className="flex flex-col">
                {selectedEvents.length > 1 && (
                  <div className="w-full text-end text-sm text-neutral-600 pb-1">
                    ({selectedEvents.length}) Event
                    {selectedEvents.length > 1 ? "s" : ""} Selected
                  </div>
                )}
                <div className="flex gap-x-[8px]">
                  <Button
                    className="rounded-xl bg-red-800/50 hover:bg-red-800/50 text-red-400 flex-1 py-[28px] mb-8"
                    size="lg"
                    variant="secondary"
                    onClick={() => deleteSelectedEvents()}
                  >
                    <Trash size={30} />
                  </Button>
                  <Button
                    className="rounded-xl text-white flex-1 py-[28px] mb-8"
                    size="lg"
                    variant="secondary"
                    onClick={() => publishSelectedEvents(true)}
                  >
                    <Eye size={30} />
                  </Button>
                  <Button
                    className="rounded-xl flex-1 text-neutral-500 py-[28px] mb-8"
                    size="lg"
                    variant="secondary"
                    onClick={() => publishSelectedEvents(false)}
                  >
                    <EyeOff size={30} />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
        {!isMobile && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="white" className="rounded-none">
                Add Event
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="mb-4">Add Event</DialogTitle>
                <DialogDescription className="hidden">
                  Add events here that will show on the website.
                </DialogDescription>
              </DialogHeader>
              <EventForm />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default EventsToolbar;
