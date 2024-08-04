import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";

import { DateTime } from "luxon";
import { Event } from "@/app/api/events/types";
import { Interval } from "@/types/Events";
import { create } from "zustand";
import { db } from "@/lib/firebase";
import { getIntervalForEvent } from "@/app/api/events/util";
import { useEventsStore } from "@/stores/EventsStore";

export const updateLastUpdatedTimestamp = async () => {
  try {
    const settingsCollection = collection(db, "site-settings");
    const q = query(
      settingsCollection,
      where("key", "==", "events-last-updated")
    );
    const querySnapshot = await getDocs(q);

    const currentTimestamp = new Date().toISOString();

    if (!querySnapshot.empty) {
      const docRef = querySnapshot.docs[0].ref;
      await updateDoc(docRef, { value: currentTimestamp });
    } else {
      await addDoc(settingsCollection, {
        key: "events-last-updated",
        value: currentTimestamp,
      });
    }
  } catch (error: any) {
    console.error("Failed to update last updated timestamp:", error.message);
  }
};

export function formatToPhoenixTime(date: string | Date): string {
  return DateTime.fromISO(date.toString(), { zone: "utc" })
    .setZone("America/Phoenix")
    .toFormat("yyyy-MM-dd HH:mm:ss");
}

interface AdminEventStoreState {
  selectedEvents: Event[];
  toggleEventSelection: (event: Event) => void;
  toggleSelectAllEventsForInterval: (interval: Interval) => void;
  isAllInIntervalSelected: (interval: Interval) => boolean;
  clearSelectedEvents: () => void;
  publishSelectedEvents: (publish: boolean) => Promise<void>;
  deleteSelectedEvents: () => Promise<void>;
  togglePublishEvent: (eventId: string) => Promise<void>;
  isEventSelected: (event: Event) => boolean;
}

export const useAdminEventStore = create<AdminEventStoreState>((set, get) => ({
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
  toggleSelectAllEventsForInterval: (interval: Interval) => {
    const { events } = useEventsStore.getState();

    const eventsForInterval = events.filter((event) => {
      const eventInterval = getIntervalForEvent(event);
      return eventInterval === interval;
    });

    const allSelected = eventsForInterval.every((event) =>
      get().selectedEvents.some((e) => e.id === event.id)
    );

    if (allSelected) {
      set({
        selectedEvents: get().selectedEvents.filter(
          (selectedEvent) =>
            !eventsForInterval.some((event) => event.id === selectedEvent.id)
        ),
      });
    } else {
      set({
        selectedEvents: [
          ...get().selectedEvents.filter(
            (selectedEvent) =>
              !eventsForInterval.some((event) => event.id === selectedEvent.id)
          ),
          ...eventsForInterval,
        ],
      });
    }
  },
  isAllInIntervalSelected: (interval: Interval) => {
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
  clearSelectedEvents: () => set({ selectedEvents: [] }),
  publishSelectedEvents: async (publish: boolean) => {
    const { selectedEvents } = get();

    try {
      const eventsCollection = collection(db, "events");
      for (const event of selectedEvents) {
        const eventRef = doc(db, "events", event.id);
        await updateDoc(eventRef, { published: publish });
      }
    } catch (error: any) {
      console.error("Failed to publish events:", error.message);
    }
  },
  deleteSelectedEvents: async () => {
    const { selectedEvents } = get();

    try {
      const batch = writeBatch(db);

      selectedEvents.forEach((event) => {
        const eventRef = doc(db, "events", event.id);
        batch.delete(eventRef);
      });

      await batch.commit();
      set({ selectedEvents: [] });
    } catch (error: any) {
      console.error("Failed to delete events:", error.message);
    }
  },
  togglePublishEvent: async (eventId: string) => {
    const { events } = useEventsStore.getState();
    const event = events.find((e) => e.id === eventId);

    if (!event) return;

    try {
      const eventRef = doc(db, "events", eventId);
      await updateDoc(eventRef, { published: !event.published });

      const updatedEvents = events.map((e) =>
        e.id === eventId ? { ...e, published: !e.published } : e
      );
      useEventsStore.setState({ events: updatedEvents });
    } catch (error: any) {
      console.error("Failed to toggle event publish status:", error.message);
    }
  },
  isEventSelected: (event: Event) =>
    get().selectedEvents.some((e) => e.id === event.id),
}));
