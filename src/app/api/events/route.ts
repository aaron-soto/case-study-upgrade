import { NextRequest, NextResponse } from "next/server";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { Event } from "@/app/api/events/types";
import { db } from "@/lib/firebase";

let cachedData: Event[] | null = null;
let lastFetch = 0;
const CACHE_DURATION = 1000 * 60 * 60 * 4; // 4 hours

export async function GET(req: NextRequest) {
  if (cachedData && Date.now() - lastFetch < CACHE_DURATION) {
    console.log("Returning cached data:", cachedData);
    return NextResponse.json(cachedData, { status: 200 });
  }

  try {
    const eventsCollection = collection(db, "events");
    const eventsSnapshot = await getDocs(eventsCollection);

    const eventsData = eventsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (!eventsData || eventsData.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    cachedData = eventsData as Event[];
    lastFetch = Date.now();

    return NextResponse.json(eventsData, { status: 200 });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Error fetching events" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data: Event = await req.json();

    console.log("Creating event:", data);

    await setDoc(doc(db, "events", data.id), data as any);

    // Invalidate cache after creating
    cachedData = null;
    lastFetch = 0;

    return NextResponse.json({ message: "Event created" }, { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Error creating event" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data: Event = await req.json();

    if (!data.id) {
      return NextResponse.json(
        { error: "Event ID is required" },
        { status: 400 }
      );
    }

    const eventRef = doc(db, "events", data.id);

    await updateDoc(eventRef, data as any);

    cachedData = null;
    lastFetch = 0;

    return NextResponse.json({ message: "Event updated" }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error updating event:", error);
    return NextResponse.json(
      { error: "Error updating event" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Event ID is required" },
        { status: 400 }
      );
    }

    await deleteDoc(doc(db, "events", id));

    // Invalidate cache after deleting
    cachedData = null;
    lastFetch = 0;

    return NextResponse.json({ message: "Event deleted" }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error deleting event:", error);
    return NextResponse.json(
      { error: "Error deleting event" },
      { status: 500 }
    );
  }
}
