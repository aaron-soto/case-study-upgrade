import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import { Event } from "@/app/api/events/types";
import { Interval } from "@/types/Events";
import { create } from "zustand";
import { db } from "@/lib/firebase";
import { getIntervalForEvent } from "@/app/api/events/util";

interface StoreState {
  events: Event[];
  selectedEvents: Event[];
  toggleEventSelection: (event: Event) => void;
  deleteSelectedEvents: () => Promise<void>;
  isEventSelected: (event: Event) => boolean;
  fetchEvents: () => Promise<void>;
  addEvent: (event: Event) => Promise<void>;
  updateEvent: (event: Event) => Promise<void>;
  setInitialEvents: (initialEvents: Event[]) => void;
  removeEvent: (eventId: string) => Promise<void>;
  toggleEventPublished: (eventId: string) => Promise<void>;
  isAllInIntervalSelected: (interval: Interval) => boolean;
  toggleSelectAllEventsForInterval: (interval: Interval) => void;
  publishSelectedEvents: () => Promise<void>;
}

export const useEventsStore = create<StoreState>((set, get) => ({
  events: [],
  selectedEvents: [],
  toggleEventSelection: (event: Event) => {
    const isSelected = get().selectedEvents.some((e) => e.id === event.id);
    if (isSelected) {
      set({
        selectedEvents: get().selectedEvents.filter((e) => e.id !== event.id),
      });
    } else {
      set({ selectedEvents: [...get().selectedEvents, event] });
    }
  },

  deleteSelectedEvents: async () => {
    const { selectedEvents, events } = get();

    try {
      const batch = selectedEvents.map((event) =>
        fetch(`/api/events`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: event.id }),
        })
      );

      await Promise.all(batch);

      const updatedEvents = events.filter(
        (event) => !selectedEvents.some((e) => e.id === event.id)
      );
      set({ events: updatedEvents, selectedEvents: [] });
    } catch (error: any) {
      console.error("Failed to delete selected events:", error.message);
    }
  },

  isEventSelected: (event: Event) => {
    return get().selectedEvents.some((e) => e.id === event.id);
  },
  fetchEvents: async () => {
    try {
      const response = await fetch("/api/events");
      const data = await response.json();
      console.log("Fetched events:", data); // Log fetched events

      if (Array.isArray(data)) {
        set({ events: data });
      } else {
        console.error("Fetched data is not an array", data);
        set({ events: [] }); // Reset to an empty array if the data isn't valid
      }
    } catch (error: any) {
      console.error("Failed to fetch events:", error.message);
    }
  },
  updateEvent: async (event: Event) => {
    try {
      const response = await fetch("/api/events", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });

      if (!response.ok) {
        throw new Error("Failed to update event");
      }

      await get().fetchEvents();
    } catch (error: any) {
      console.error("Failed to update event:", error.message);
    }
  },
  setInitialEvents: (initialEvents: Event[]) => {
    set({ events: initialEvents });
  },
  addEvent: async (event: Event) => {
    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });

      if (!response.ok) {
        throw new Error("Failed to add event");
      }

      const data = await response.json();
      set({ events: [...get().events, data] });
    } catch (error: any) {
      console.error("Failed to add event:", error.message);
    }
  },
  removeEvent: async (eventId: string) => {
    try {
      const eventRef = doc(db, "events", eventId);
      await deleteDoc(eventRef);

      const updatedEvents = get().events.filter(
        (event) => event.id !== eventId
      );
      set({ events: updatedEvents });
    } catch (error: any) {
      console.error("Failed to remove event:", error.message);
    }
  },
  toggleEventPublished: async (eventId: string) => {
    const { events } = get();
    const event = events.find((e) => e.id === eventId);

    if (!event) throw new Error("No event found");

    try {
      const response = await fetch("/api/events", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...event, published: !event.published }),
      });

      if (!response.ok) {
        throw new Error("Failed to update event");
      }

      await get().fetchEvents();
    } catch (error: unknown) {
      console.error("Failed to update event:", error);
    }
  },
  isAllInIntervalSelected: (interval: Interval): boolean => {
    const { events } = useEventsStore.getState();

    const eventsForInterval = events.filter((event) => {
      const eventInterval = getIntervalForEvent(event);
      return eventInterval === interval;
    });

    if (eventsForInterval.length === 0) return false;

    return eventsForInterval.every((event) =>
      get().selectedEvents.some((e) => e.id === event.id)
    );
  },
  toggleSelectAllEventsForInterval: (interval: Interval) => {
    const { events } = useEventsStore.getState();

    const eventsForInterval = events.filter((event) => {
      const eventInterval = getIntervalForEvent(event);
      return eventInterval === interval;
    });

    const allSelected = get().isAllInIntervalSelected(interval);

    if (allSelected) {
      const updatedSelectedEvents = get().selectedEvents.filter(
        (event) => !eventsForInterval.some((e) => e.id === event.id)
      );
      set({ selectedEvents: updatedSelectedEvents });
    } else {
      const updatedSelectedEvents = [
        ...get().selectedEvents,
        ...eventsForInterval,
      ];
      set({ selectedEvents: updatedSelectedEvents });
    }
  },
  publishSelectedEvents: async () => {
    const { selectedEvents } = get();

    try {
      const batch = selectedEvents.map((event) =>
        fetch("/api/events", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...event, published: true }),
        })
      );

      await Promise.all(batch);

      await get().fetchEvents();
    } catch (error: any) {
      console.error("Failed to publish selected events:", error.message);
    }
  },
}));
