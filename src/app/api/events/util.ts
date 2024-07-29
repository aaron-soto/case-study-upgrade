import { collection, getDocs, query } from "firebase/firestore";

import { db } from "@/lib/firebase";

export const fetchEvents = async (): Promise<Event[]> => {
  const eventsCollection = collection(db, "events");
  const eventsQuery = query(eventsCollection);
  const eventsSnapshot = await getDocs(eventsQuery);
  const events = eventsSnapshot.docs.map((doc) => doc.data() as Event);

  return events;
};
