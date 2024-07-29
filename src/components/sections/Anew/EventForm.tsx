"use client";

import {
  adjustDateForDisplay,
  formatDateToTimeString,
  parseTimeStringToDate,
} from "@/components/sections/Anew/EventUtils";

import { Checkbox } from "@/components/ui/checkbox";
import DatePicker from "@/components/sections/Anew/DatePicker";
import { Event } from "@/types/Events";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { TimePicker } from "@/components/sections/Anew/TimePicker";
import { useEventStore } from "@/stores/EventStore";
import { useToast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from "uuid";

const EventForm = ({
  event,
  onEventAdded,
}: {
  event?: Event; // Made event optional
  onEventAdded: () => void;
}) => {
  const { addEvent } = useEventStore();
  const { toast } = useToast();

  const [formData, setFormData] = React.useState({
    title: event?.title || "",
    description: event?.description || "",
    date: event?.date ? adjustDateForDisplay(new Date(event.date)) : new Date(),
    startTime: event?.startTime || "",
    endTime: event?.endTime || "",
    published: event?.published || false,
    id: event?.id ?? uuidv4(), // Use nullish coalescing operator
    urgent: event?.urgent || false,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setFormData((prevData) => ({
      ...prevData,
      date: date || new Date(),
    }));
  };

  const handleTimeChange = (name: string, date: Date | undefined) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: date ? formatDateToTimeString(date) : "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const localDate = new Date(formData.date);
    const adjustedDate = new Date(
      localDate.getTime() - localDate.getTimezoneOffset() * 60000
    ).toISOString();

    const updatedEvent: Event = {
      ...formData,
      date: adjustedDate,
      startTime: formData.startTime || "",
      endTime: formData.endTime || "",
    };

    addEvent(updatedEvent).then(() => {
      toast({
        title: "Event updated!",
        description: "Event updated successfully.",
      });

      setFormData({
        title: "",
        description: "",
        date: new Date(),
        startTime: "",
        endTime: "",
        published: false,
        id: uuidv4(),
        urgent: false,
      });

      // Call the callback function to notify the parent component
      onEventAdded();
    });
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-md mx-auto"
    >
      <div className="flex flex-col w-full gap-4 py-2">
        <Label htmlFor="title">Event Name</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          onFocus={handleFocus}
          className="text-base"
          placeholder="Enter event name..."
        />
      </div>
      <div className="flex flex-col gap-4 py-2">
        <Label htmlFor="description">Event Description</Label>
        <Input
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          onFocus={handleFocus}
          className="text-base"
          placeholder="Enter event description..."
        />
      </div>
      <div className="flex flex-col gap-4 py-2">
        <Label htmlFor="date">Event Date</Label>
        <DatePicker date={formData.date} setDate={handleDateChange} />
      </div>
      <div className="flex w-full gap-4">
        <div className="flex flex-col gap-4 py-2">
          <Label htmlFor="startTime">Start Time</Label>
          <TimePicker
            date={
              formData.startTime
                ? parseTimeStringToDate(formData.startTime)
                : undefined
            }
            setDate={(date) => handleTimeChange("startTime", date)}
          />
        </div>
        <div className="flex flex-col gap-4 py-2">
          <Label htmlFor="endTime">End Time</Label>
          <TimePicker
            date={
              formData.endTime
                ? parseTimeStringToDate(formData.endTime)
                : undefined
            }
            setDate={(date) => handleTimeChange("endTime", date)}
          />
        </div>
      </div>
      <div className="flex flex-col items-start py-2 gap-4">
        <Label htmlFor="published">Published</Label>
        <Checkbox
          id="published"
          checked={formData.published}
          onCheckedChange={() => {
            setFormData({ ...formData, published: !formData.published });
          }}
        />
      </div>
      <div className="flex flex-col items-start py-2 gap-4">
        <Label htmlFor="urgent">Urgent</Label>
        <Checkbox
          id="urgent"
          checked={formData.urgent}
          onCheckedChange={() => {
            setFormData({ ...formData, urgent: !formData.urgent });
          }}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md"
      >
        Save Event
      </button>
    </form>
  );
};

export default EventForm;
