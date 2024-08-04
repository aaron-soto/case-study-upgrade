import { Event } from "@/app/api/events/types";

const LAST_FETCHED_KEY = "events-last-fetched";
const EVENTS_KEY = "events";

export const storeEventsInLocalStorage = (events: Event[]) => {
  localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
};

export const getEventsFromLocalStorage = (): Event[] => {
  const events = localStorage.getItem(EVENTS_KEY);
  return events ? JSON.parse(events) : [];
};

export const getLastFetchedTimestamp = (): Date => {
  const timestamp = localStorage.getItem(LAST_FETCHED_KEY);
  return timestamp ? new Date(timestamp) : new Date(0);
};

export const setLastFetchedTimestamp = (timestamp: Date) => {
  localStorage.setItem(LAST_FETCHED_KEY, timestamp.toISOString());
};

export const clearEventsFromLocalStorage = () => {
  localStorage.removeItem(EVENTS_KEY);
  localStorage.removeItem(LAST_FETCHED_KEY);
};
