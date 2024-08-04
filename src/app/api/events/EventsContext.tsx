"use client";

import { createContext, useContext, useEffect } from "react";

import { Event } from "@/app/api/events/types";
import { useEventsStore } from "@/stores/EventsStore";

interface EventSProviderProps {
  initialEvents: Event[];
  children: React.ReactNode;
}

const EventsContext = createContext<Event[] | null>(null);

export const EventsProvider: React.FC<EventSProviderProps> = ({
  initialEvents,
  children,
}: EventSProviderProps) => {
  const { events, setInitialEvents } = useEventsStore();

  useEffect(() => {
    setInitialEvents(initialEvents);
  }, [initialEvents, setInitialEvents]);

  return (
    <EventsContext.Provider value={events}>{children}</EventsContext.Provider>
  );
};

export const useEvents = () => {
  return useContext(EventsContext);
};
