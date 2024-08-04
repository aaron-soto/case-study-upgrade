import { Event, Interval } from "@/types/Events";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import {
  clearEventsFromLocalStorage,
  getEventsFromLocalStorage,
  getLastFetchedTimestamp,
  setLastFetchedTimestamp,
  storeEventsInLocalStorage,
} from "@/lib/localStorage";

import { create } from "zustand";
import { db } from "@/lib/firebase";
import { useEventsStore } from "@/stores/EventsStore";

const createUpdateObject = (event: Partial<Event>) => {
  const updateObject: { [key: string]: any } = {};
  if (event.title !== undefined) updateObject.title = event.title;
  if (event.description !== undefined)
    updateObject.description = event.description;
  if (event.date !== undefined) updateObject.date = event.date;
  if (event.startTime !== undefined) updateObject.startTime = event.startTime;
  if (event.endTime !== undefined) updateObject.endTime = event.endTime;
  if (event.published !== undefined) updateObject.published = event.published;
  if (event.urgent !== undefined) updateObject.urgent = event.urgent;
  return updateObject;
};

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

const fetchLastUpdatedTimestamp = async (): Promise<Date> => {
  try {
    const settingsCollection = collection(db, "site-settings");
    const q = query(
      settingsCollection,
      where("key", "==", "events-last-updated")
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const timestamp: Date = querySnapshot.docs[0].data().value;
      localStorage.setItem(
        "events-last-updated",
        new Date(timestamp).toISOString()
      );
      return new Date(timestamp);
    }
  } catch (error: any) {
    console.error("Failed to fetch last updated timestamp:", error.message);
  }

  return new Date(0);
};

export const getIntervalForEvent = (event: Event): Interval => {
  const now = new Date();
  const eventDate = new Date(event.date);

  const nowDateOnly = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );
  const eventDateOnly = new Date(
    eventDate.getFullYear(),
    eventDate.getMonth(),
    eventDate.getDate()
  );

  if (eventDateOnly < nowDateOnly) return Interval.PAST;
  if (eventDateOnly.getTime() === nowDateOnly.getTime()) return Interval.TODAY;
  return Interval.FUTURE;
};

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
