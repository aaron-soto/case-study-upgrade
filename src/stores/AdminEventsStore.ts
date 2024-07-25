import { Event, EventFilterTypes } from "@/types/Events";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
  writeBatch,
} from "firebase/firestore";

import { create } from "zustand";
import { db } from "@/lib/firebase";

interface StoreState {
  eventsToday: Event[];
  eventsPast: Event[];
  eventsFuture: Event[];
  selectedEvents: Event[];
  addEvent: (event: Event) => Promise<boolean>;
  fetchEvents: (
    category: EventFilterTypes,
    onlyPublished?: boolean
  ) => Promise<void>;
  isEventToday: (event: Event) => boolean;
  isEventInPast: (event: Event) => boolean;
  isEventInFuture: (event: Event) => boolean;
  isEventSelected: (event: Event) => boolean;
  toggleEventSelection: (event: Event) => void;
  clearSelectedEvents: () => void;
  archiveSelectedEvents: () => Promise<void>;
  publishSelectedEvents: (publish: boolean) => Promise<void>;
  deleteSelectedEvents: () => Promise<void>;
}

export const useAdminEventsStore = create<StoreState>((set, get) => ({
  eventsToday: [],
  eventsPast: [],
  eventsFuture: [],
  selectedEvents: [],
  addEvent: async (event: Event) => {
    try {
      const eventRef = doc(db, "events", event.id);
      const eventDoc = await getDoc(eventRef);

      if (!eventDoc.exists()) {
        await setDoc(eventRef, event);
      }
      get().fetchEvents(EventFilterTypes.TODAY);
      get().fetchEvents(EventFilterTypes.PAST);
      get().fetchEvents(EventFilterTypes.FUTURE);
      return true;
    } catch (error: any) {
      console.error("Failed to add event:", error.message);
      return false;
    }
  },
  fetchEvents: async (category: EventFilterTypes, onlyPublished = false) => {
    try {
      const eventsCollection = collection(db, "events");
      let eventsQuery;
      if (onlyPublished) {
        eventsQuery = query(eventsCollection, where("published", "==", true));
      } else {
        eventsQuery = eventsCollection;
      }
      const eventsSnapshot = await getDocs(eventsQuery);
      const eventsList = eventsSnapshot.docs.map((doc) => doc.data() as Event);

      switch (category) {
        case EventFilterTypes.TODAY:
          const eventsToday = eventsList.filter(get().isEventToday);
          set({ eventsToday });
          break;
        case EventFilterTypes.PAST:
          const eventsPast = eventsList.filter(get().isEventInPast);
          set({ eventsPast });
          break;
        case EventFilterTypes.FUTURE:
          const eventsFuture = eventsList.filter(get().isEventInFuture);
          set({ eventsFuture });
          break;
        default:
          console.error("Unknown category:", category);
      }
    } catch (error: any) {
      console.error("Failed to fetch events:", error.message);
    }
  },
  isEventToday: (event: Event) => {
    const today = new Date();
    const eventDate = new Date(event.date);

    today.setHours(0, 0, 0, 0);
    eventDate.setHours(0, 0, 0, 0);

    return eventDate.getTime() === today.getTime();
  },
  isEventInPast: (event: Event) => {
    const today = new Date();
    const eventDate = new Date(event.date);

    today.setHours(0, 0, 0, 0);
    eventDate.setHours(0, 0, 0, 0);

    return eventDate.getTime() < today.getTime();
  },
  isEventInFuture: (event: Event) => {
    const today = new Date();
    const eventDate = new Date(event.date);

    today.setHours(0, 0, 0, 0);
    eventDate.setHours(0, 0, 0, 0);

    return eventDate.getTime() > today.getTime();
  },
  isEventSelected: (event: Event) => {
    return get().selectedEvents.some(
      (selectedEvent) => selectedEvent.id === event.id
    );
  },
  toggleEventSelection: (event: Event) => {
    set((state) => {
      const isSelected = state.selectedEvents.some(
        (selectedEvent) => selectedEvent.id === event.id
      );
      if (isSelected) {
        return {
          selectedEvents: state.selectedEvents.filter(
            (selectedEvent) => selectedEvent.id !== event.id
          ),
        };
      } else {
        return {
          selectedEvents: [...state.selectedEvents, event],
        };
      }
    });
  },
  clearSelectedEvents: () => {
    set({ selectedEvents: [] });
  },
  archiveSelectedEvents: async () => {
    const { selectedEvents } = get();
    const batch = writeBatch(db);

    selectedEvents.forEach((event) => {
      const eventRef = doc(db, "events", event.id);
      batch.update(eventRef, { archived: true });
    });

    try {
      await batch.commit();
      set({ selectedEvents: [] });
      get().fetchEvents(EventFilterTypes.TODAY); // Re-fetch events after archiving
      get().fetchEvents(EventFilterTypes.PAST); // Re-fetch events after archiving
      get().fetchEvents(EventFilterTypes.FUTURE); // Re-fetch events after archiving
    } catch (error: any) {
      console.error("Failed to archive selected events:", error.message);
    }
  },
  publishSelectedEvents: async (publish: boolean) => {
    const { selectedEvents } = get();
    const batch = writeBatch(db);

    selectedEvents.forEach((event) => {
      const eventRef = doc(db, "events", event.id);
      batch.update(eventRef, { published: publish });
    });

    try {
      await batch.commit();
      set({ selectedEvents: [] });
      get().fetchEvents(EventFilterTypes.TODAY); // Re-fetch events after publishing/unpublishing
      get().fetchEvents(EventFilterTypes.PAST); // Re-fetch events after publishing/unpublishing
      get().fetchEvents(EventFilterTypes.FUTURE); // Re-fetch events after publishing/unpublishing
    } catch (error: any) {
      console.error(
        "Failed to update publish status for selected events:",
        error.message
      );
    }
  },
  deleteSelectedEvents: async () => {
    const { selectedEvents } = get();
    const batch = writeBatch(db);

    selectedEvents.forEach((event) => {
      const eventRef = doc(db, "events", event.id);
      batch.delete(eventRef);
    });

    try {
      await batch.commit();
      set({ selectedEvents: [] });
      get().fetchEvents(EventFilterTypes.TODAY); // Re-fetch events after deleting
      get().fetchEvents(EventFilterTypes.PAST); // Re-fetch events after deleting
      get().fetchEvents(EventFilterTypes.FUTURE); // Re-fetch events after deleting
    } catch (error: any) {
      console.error("Failed to delete selected events:", error.message);
    }
  },
}));
