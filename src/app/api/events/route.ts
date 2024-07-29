import { NextRequest, NextResponse } from "next/server";
import { collection, getDocs, query } from "firebase/firestore";

import { db } from "@/lib/firebase";

export const fetchEvents = async (): Promise<Event[]> => {
  const eventsCollection = collection(db, "events");
  const eventsQuery = query(eventsCollection);
  const eventsSnapshot = await getDocs(eventsQuery);
  const events = eventsSnapshot.docs.map((doc) => doc.data() as Event);

  return events;
};

export async function GET(req: NextRequest) {
  try {
    const events = await fetchEvents();
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Error fetching events" },
      { status: 500 }
    );
  }
}
