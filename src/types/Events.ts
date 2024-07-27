export enum EventFilterTypes {
  TODAY = "today",
  FUTURE = "future",
  PAST = "past",
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime?: string;
  endTime?: string;
  published: boolean;
  urgent: boolean;
}
