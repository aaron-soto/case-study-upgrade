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
  published: boolean;
  archived: boolean;
}
