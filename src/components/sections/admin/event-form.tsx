"use client";

import "react-datepicker/dist/react-datepicker.css";

import * as React from "react";

import { Button } from "@/components/ui/button";
import DatePicker from "react-datepicker";
import { EventFilterTypes } from "@/types/Events";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { useAdminEventsStore } from "@/stores/AdminEventsStore";
import { v4 as uuidv4 } from "uuid";

export function EventForm({ initialData }: any) {
  const { addEvent, fetchEvents } = useAdminEventsStore();
  const [formData, setFormData] = React.useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    date: initialData?.date || new Date(),
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

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const localDate = new Date(formData.date);
    const adjustedDate = new Date(
      localDate.getTime() - localDate.getTimezoneOffset() * 60000
    ).toISOString();

    const eventToAdd = {
      ...formData,
      id: uuidv4(),
      date: adjustedDate,
      published: false,
      archived: false,
    };

    addEvent(eventToAdd).then((success) => {
      if (success) {
        setFormData({
          title: "",
          description: "",
          date: new Date(),
        });

        toast({
          title: "Event added successfully",
          description: "The event has been added to the database.",
        });

        fetchEvents(EventFilterTypes.TODAY);
        fetchEvents(EventFilterTypes.PAST);
        fetchEvents(EventFilterTypes.FUTURE);
      } else {
        toast({
          title: "Failed to add event",
          description: "An error occurred while adding the event.",
          variant: "destructive",
        });
      }
    });
  };

  const handleFocus = (event: any) => {
    event.target.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const generateTimeOptions = () => {
    const times = [];
    for (let i = 0; i < 24; i++) {
      times.push(new Date().setHours(i, 0, 0, 0));
      times.push(new Date().setHours(i, 30, 0, 0));
    }
    return times;
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-[500px] flex flex-col gap-4">
      <div className="flex flex-col gap-4 py-2">
        <Label htmlFor="title">Event Name</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          onFocus={handleFocus}
          className="text-base"
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
        />
      </div>
      <div className="flex flex-col gap-4 py-2">
        <Label htmlFor="date">Select Date:</Label>
        <DatePicker
          selected={formData.date}
          onChange={handleDateChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={30}
          timeCaption="Time"
          dateFormat="MMMM d, yyyy h:mm aa"
          includeTimes={generateTimeOptions().map((time) => new Date(time))}
          className="p-2 text-white bg-transparent border rounded-md date-input text-base"
          wrapperClassName="p-2 text-white bg-transparent border rounded-md"
        />
      </div>
      <Button type="submit" className="text-white bg-orange-400">
        Save Event
      </Button>
    </form>
  );
}
