"use client";

import * as React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";
import { TimePickerInput } from "@/components/sections/Anew/TimePickerInput";

interface TimePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

export function TimePicker({ date, setDate }: TimePickerProps) {
  const [period, setPeriod] = React.useState(
    date?.getHours()! >= 12 ? "PM" : "AM"
  );
  const minuteRef = React.useRef<HTMLInputElement>(null);
  const hourRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (date) {
      const hours = date.getHours();
      const newPeriod = hours >= 12 ? "PM" : "AM";
      setPeriod(newPeriod);
    }
  }, [date]);

  const handlePeriodChange = (value: string) => {
    if (date) {
      const hours = date.getHours();
      const newHours = value === "PM" ? (hours % 12) + 12 : hours % 12;
      const newDate = new Date(date);
      newDate.setHours(newHours);
      setDate(newDate);
      setPeriod(value);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className="grid gap-1 text-center">
        <TimePickerInput
          picker="12hours"
          date={date}
          setDate={setDate}
          ref={hourRef}
          onRightFocus={() => minuteRef.current?.focus()}
          period={period}
        />
      </div>
      <span>:</span>
      <div className="grid gap-1 text-center">
        <TimePickerInput
          picker="minutes"
          date={date}
          setDate={setDate}
          ref={minuteRef}
          onLeftFocus={() => hourRef.current?.focus()}
        />
      </div>
      <div className="grid gap-1 text-center">
        <Select value={period} onValueChange={handlePeriodChange}>
          <SelectTrigger>
            <SelectValue placeholder="AM" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AM">AM</SelectItem>
            <SelectItem value="PM">PM</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
