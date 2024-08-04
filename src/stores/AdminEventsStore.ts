import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";

import { Event } from "@/app/api/events/types";
import { Interval } from "@/types/Events";
import { create } from "zustand";
import { db } from "@/lib/firebase";
import { useEventsStore } from "@/stores/EventsStore";

interface StoreState {
  eventsToday: Event[];
  eventsPast: Event[];
  eventsFuture: Event[];
  selectedEvents: Event[];
  addEvent: (event: Event) => Promise<boolean>;
  fetchEvents: (category: Interval, onlyPublished?: boolean) => Promise<void>;
  isEventToday: (event: Event) => boolean;
  isEventInPast: (event: Event) => boolean;
  isEventInFuture: (event: Event) => boolean;
  isEventSelected: (event: Event) => boolean;
  toggleEventSelection: (event: Event) => void;
  toggleAllEvents: (category: Interval) => void;
  isAllInCategorySelected: (category: Interval) => boolean;
  clearSelectedEvents: () => void;
  archiveSelectedEvents: () => Promise<void>;
  publishSelectedEvents: (publish: boolean) => Promise<void>;
  togglePublishEvent: (eventId: string) => Promise<void>;
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
      get().fetchEvents(Interval.TODAY);
      get().fetchEvents(Interval.PAST);
      get().fetchEvents(Interval.FUTURE);
      return true;
    } catch (error: any) {
      console.error("Failed to add event:", error.message);
      return false;
    }
  },
  fetchEvents: async (category: Interval, onlyPublished = false) => {
    try {
      const eventsCollection = collection(db, "events");
      let eventsQuery;
      if (onlyPublished) {
        eventsQuery = query(eventsCollection, where("published", "==", true));
      } else {
        eventsQuery = eventsCollection;
      }
      const eventsSnapshot = await getDocs(eventsQuery);
      let eventsList = eventsSnapshot.docs.map((doc) => doc.data() as Event);

      // Sort events by date
      eventsList = eventsList.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );

      switch (category) {
        case Interval.TODAY:
          const eventsToday = eventsList.filter(get().isEventToday);
          set({ eventsToday });
          break;
        case Interval.PAST:
          const eventsPast = eventsList.filter(get().isEventInPast);
          set({ eventsPast });
          break;
        case Interval.FUTURE:
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
  toggleAllEvents: (category: Interval) => {
    set((state) => {
      let eventsInCategory: Event[] = [];
      switch (category) {
        case Interval.TODAY:
          eventsInCategory = state.eventsToday;
          break;
        case Interval.PAST:
          eventsInCategory = state.eventsPast;
          break;
        case Interval.FUTURE:
          eventsInCategory = state.eventsFuture;
          break;
      }
      const allSelected = eventsInCategory.every((event) =>
        state.selectedEvents.some(
          (selectedEvent) => selectedEvent.id === event.id
        )
      );
      if (allSelected) {
        return {
          selectedEvents: state.selectedEvents.filter(
            (selectedEvent) =>
              !eventsInCategory.some((event) => event.id === selectedEvent.id)
          ),
        };
      } else {
        return {
          selectedEvents: [
            ...state.selectedEvents.filter(
              (selectedEvent) =>
                !eventsInCategory.some((event) => event.id === selectedEvent.id)
            ),
            ...eventsInCategory,
          ],
        };
      }
    });
  },
  isAllInCategorySelected: (category: Interval) => {
    const { selectedEvents, eventsToday, eventsPast, eventsFuture } = get();
    let eventsInCategory: Event[] = [];
    switch (category) {
      case Interval.TODAY:
        eventsInCategory = eventsToday;
        break;
      case Interval.PAST:
        eventsInCategory = eventsPast;
        break;
      case Interval.FUTURE:
        eventsInCategory = eventsFuture;
        break;
    }
    return eventsInCategory.every((event) =>
      selectedEvents.some((selectedEvent) => selectedEvent.id === event.id)
    );
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
      get().fetchEvents(Interval.TODAY); // Re-fetch events after archiving
      get().fetchEvents(Interval.PAST); // Re-fetch events after archiving
      get().fetchEvents(Interval.FUTURE); // Re-fetch events after archiving
    } catch (error: any) {
      console.error("Failed to archive selected events:", error.message);
    }
  },
  publishSelectedEvents: async (publish: boolean) => {
    console.log("Publishing events");
    const { selectedEvents } = get();
    console.log(selectedEvents);
    const batch = writeBatch(db);

    const updateEvent = useEventsStore.getState().updateEvent;

    selectedEvents.forEach((event: Event) => {
      // const eventRef = doc(db, "events", event.id);
      // batch.update(eventRef, { published: publish });
      updateEvent({ ...event, published: publish });
    });

    try {
      await batch.commit();
      set({ selectedEvents: [] });
      get().fetchEvents(Interval.TODAY); // Re-fetch events after publishing/unpublishing
      get().fetchEvents(Interval.PAST); // Re-fetch events after publishing/unpublishing
      get().fetchEvents(Interval.FUTURE); // Re-fetch events after publishing/unpublishing
    } catch (error: any) {
      console.error(
        "Failed to update publish status for selected events:",
        error.message
      );
    }
  },
  togglePublishEvent: async (eventId: string) => {
    try {
      const eventRef = doc(db, "events", eventId);
      const eventDoc = await getDoc(eventRef);

      if (eventDoc.exists()) {
        const currentStatus = eventDoc.data().published;
        await updateDoc(eventRef, { published: !currentStatus });

        get().fetchEvents(Interval.TODAY); // Re-fetch events after updating
        get().fetchEvents(Interval.PAST); // Re-fetch events after updating
        get().fetchEvents(Interval.FUTURE); // Re-fetch events after updating
      } else {
        console.error("Event not found for toggling publish status");
      }
    } catch (error: any) {
      console.error(
        "Failed to toggle publish status for event:",
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
      get().fetchEvents(Interval.TODAY); // Re-fetch events after deleting
      get().fetchEvents(Interval.PAST); // Re-fetch events after deleting
      get().fetchEvents(Interval.FUTURE); // Re-fetch events after deleting
    } catch (error: any) {
      console.error("Failed to delete selected events:", error.message);
    }
  },
}));
