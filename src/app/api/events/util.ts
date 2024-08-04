import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";

import { Event } from "@/app/api/events/types";
import { Interval } from "@/types/Events";
import { db } from "@/lib/firebase";

export const fetchAllEvents = async () => {
  try {
    const eventsCollection = collection(db, "events");
    const eventsSnapshot = await getDocs(eventsCollection);

    const eventsData = eventsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return eventsData;
  } catch (error: unknown) {
    console.error("Failed to fetch events:", error);
    throw new Error("Could not fetch events");
  }
};

export const createEvent = async (event: Event) => {
  try {
    // Add event to Firestore (or any other database you are using)
    const eventsCollection = collection(db, "events");
    await addDoc(eventsCollection, event);

    return;
  } catch (error: unknown) {
    console.error("Failed to create event:", error);
    throw new Error("Could not create event");
  }
};

export const updateEvent = async (event: any) => {
  try {
    // Update event in Firestore (or any other database you are using)
    const eventRef = doc(db, "events", event.id);

    await updateDoc(eventRef, event);

    return;
  } catch (error: unknown) {
    console.error("Failed to update event:", error);
    throw new Error("Could not update event");
  }
};

export const deleteEvent = async (eventId: string) => {
  try {
    // Delete event from Firestore (or any other database you are using)
    await deleteDoc(doc(db, "events", eventId));

    return;
  } catch (error: unknown) {
    console.error("Failed to delete event:", error);
    throw new Error("Could not delete event");
  }
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
