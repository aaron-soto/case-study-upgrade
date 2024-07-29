"use client";

import * as XLSX from "xlsx";

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
import React, { useEffect, useRef, useState } from "react";
import {
  updateLastUpdatedTimestamp,
  useAdminEventStore,
  useEventStore,
} from "@/stores/EventStore";

import { Button } from "@/components/ui/button";
import EventForm from "@/components/sections/Anew/EventForm";
import { Interval } from "@/types/Events";
import { toast } from "@/components/ui/use-toast";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { v4 as uuidV4 } from "uuid";

const EventsToolbar = () => {
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [publishAlertOpen, setPublishAlertOpen] = useState(false);
  const [unpublishAlertOpen, setUnpublishAlertOpen] = useState(false);
  const { addEvent, fetchEvents } = useEventStore();
  const { selectedEvents, publishSelectedEvents, deleteSelectedEvents } =
    useAdminEventStore();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDelete = () => {
    deleteSelectedEvents();
    fetchEvents();
    setAlertOpen(false);
  };

  const triggerRefresh = () => {
    fetchEvents();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const arrayBuffer = event.target?.result as ArrayBuffer;
        const workbook = XLSX.read(new Uint8Array(arrayBuffer), {
          type: "array",
          cellDates: true, // Ensures dates are parsed correctly
        });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        const events = jsonData
          .slice(1)
          .filter((row: any) =>
            row.some(
              (cell: any) => cell !== null && cell !== undefined && cell !== ""
            )
          )
          .map((row: any) => ({
            title: row[0],
            description: row[1],
            date:
              row[2] instanceof Date
                ? row[2].toISOString().split("T")[0]
                : row[2], // Format date as YYYY-MM-DD
            startTime:
              row[3] instanceof Date
                ? row[3].toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : row[3], // Format time as HH:MM
            endTime:
              row[4] instanceof Date
                ? row[4].toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : row[4], // Format time as HH:MM
            urgent: row[5],
            published: row[6],
            id: uuidV4(),
          }));

        events.forEach((event) => {
          addEvent(event);
        });

        fetchEvents();

        updateLastUpdatedTimestamp();

        toast({
          title: "Events Imported",
          description: "Events have been imported successfully.",
        });
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const importEvents = () => {
    fileInputRef.current?.click();
  };

  const onEventAdded = () => {
    setOpen(false);
  };

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
          <RefreshCcw size={24} />
        </Button>
        <Button
          variant="secondary"
          onClick={importEvents}
          className="rounded-none"
        >
          Import Events
        </Button>
        <input
          type="file"
          accept=".xlsx, .xls"
          ref={fileInputRef}
          onChange={handleFileUpload}
          style={{ display: "none" }}
        />
        {isMobile && (
          <div className="flex fixed gap-2 bottom-0 z-10 left-0 items-end right-0 p-2.5 pt-1 bg-[#0c0b09] border-t w-full">
            <Dialog open={open} modal={false} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="rounded-xl flex-1 bg-[#0D4F48] py-[28px] mb-8"
                  variant="secondary"
                >
                  <Plus size={30} className="text-[#4a9890]" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="mb-4">Add Event</DialogTitle>
                  <DialogDescription className="hidden">
                    Add events here that will show on the website.
                  </DialogDescription>
                </DialogHeader>
                <EventForm event={undefined} onEventAdded={onEventAdded} />
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
          <Dialog modal={false} open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="white" className="rounded-none">
                Add Event
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="mb-4">Add Event</DialogTitle>
                <DialogDescription className="hidden">
                  Add events here that will show on the website.
                </DialogDescription>
              </DialogHeader>
              <EventForm event={undefined} onEventAdded={onEventAdded} />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default EventsToolbar;
