"use client";

import "react-datepicker/dist/react-datepicker.css";

import * as React from "react";

import { Event, Interval } from "@/types/Events";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import DatePicker from "react-datepicker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { useAdminEventsStore } from "@/stores/AdminEventsStore";
import { v4 as uuidv4 } from "uuid";

export function EventForm({ initialData }: any) {
  const { addEvent, fetchEvents } = useAdminEventsStore();

  const parseTimeString = (timeString: string) => {
    const date = new Date();
    const [time, modifier] = timeString.split(" ");
    let [hours, minutes, seconds] = time.split(":");

    if (hours === "12") {
      hours = "00";
    }

    if (modifier === "PM") {
      hours = (parseInt(hours, 10) + 12).toString();
    }

    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    date.setSeconds(seconds ? parseInt(seconds, 10) : 0);

    return date;
  };

  const [formData, setFormData] = React.useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    date: initialData?.date ? new Date(initialData.date) : new Date(),
    startTime: initialData?.startTime
      ? parseTimeString(initialData.startTime)
      : null,
    endTime: initialData?.endTime ? parseTimeString(initialData.endTime) : null,
    published: initialData?.published || false,
    id: initialData?.id || null,
    urgent: initialData?.urgent || false,
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (
    date: Date | null,
    event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
  ) => {
    if (date) {
      setFormData((prevData) => ({
        ...prevData,
        date: date,
      }));
    }
  };

  const handleTimeChange = (name: string, date: Date | null) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: date,
    }));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const localDate = new Date(formData.date);
    const adjustedDate = new Date(
      localDate.getTime() - localDate.getTimezoneOffset() * 60000
    ).toISOString();

    const formatTime = (date: Date | null) => {
      if (!date) return "";
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      const period = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12; // Convert to 12-hour format
      const formattedMinutes = minutes.toString().padStart(2, "0");
      const formattedSeconds = seconds.toString().padStart(2, "0");
      return `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${period}`;
    };

    const eventToSave: Event = {
      ...formData,
      date: adjustedDate,
      startTime: formatTime(formData.startTime),
      endTime: formatTime(formData.endTime),
      urgent: formData.urgent,
      id: formData.id ? formData.id : uuidv4(),
    };

    const success = await addEvent(eventToSave);

    if (success) {
      setFormData({
        title: "",
        description: "",
        date: new Date(),
        startTime: null,
        endTime: null,
        published: false,
        urgent: false,
        id: null,
      });

      toast({
        title: `Event ${formData.id ? "updated" : "added"} successfully`,
        description: `The event has been ${
          formData.id ? "updated" : "added"
        } in the database.`,
      });

      fetchEvents(Interval.TODAY);
      fetchEvents(Interval.PAST);
      fetchEvents(Interval.FUTURE);
    } else {
      toast({
        title: `Failed to ${formData.id ? "update" : "add"} event`,
        description: `An error occurred while ${
          formData.id ? "updating" : "adding"
        } the event.`,
        variant: "destructive",
      });
    }
  };

  const handleFocus = (event: any) => {
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

      <div className="flex w-full gap-4">
        <div className="gap-4 py-2">
          <Label htmlFor="date">Select Date:</Label>
          <DatePicker
            selected={formData.date}
            onChange={handleDateChange}
            dateFormat="M/d/yyyy"
            className="p-2 w-full text-white bg-transparent border rounded-md date-input text-base"
          />
        </div>
        <div className="gap-4 py-2">
          <Label htmlFor="startTime">Start Time</Label>
          <DatePicker
            selected={formData.startTime}
            onChange={(date) => handleTimeChange("startTime", date)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            timeCaption="Time"
            dateFormat="h:mm aa"
            className="py-2 px-2 w-full text-white bg-transparent border rounded-md text-base"
            wrapperClassName="inline-block box-border text-white bg-transparent border rounded-md"
            placeholderText="Select start time"
          />
        </div>
        <div className="gap-4 py-2">
          <Label htmlFor="endTime">End Time</Label>
          <DatePicker
            selected={formData.endTime}
            onChange={(date) => handleTimeChange("endTime", date)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            timeCaption="Time"
            dateFormat="h:mm aa"
            className="py-2 px-2 w-full text-white bg-transparent border rounded-md text-base"
            wrapperClassName="inline-block box-border text-white bg-transparent border rounded-md"
            placeholderText="Select end time"
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
      <Button
        type="submit"
        className="text-white bg-orange-400 hover:bg-orange-300"
      >
        {formData.id ? "Update Event" : "Save Event"}
      </Button>
    </form>
  );
}
