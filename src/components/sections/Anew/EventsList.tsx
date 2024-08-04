"use client";

import EventListInterval from "@/components/sections/Anew/EventListInterval";
import { Interval } from "@/types/Events";

interface EventsListProps {
  adminPage?: boolean;
}

const EventsList = ({ adminPage }: EventsListProps) => {
  return (
    <>
      {(Object.keys(Interval) as Array<keyof typeof Interval>).map(
        (interval, idx) => (
          <EventListInterval
            key={idx}
            adminPage={adminPage}
            interval={Interval[interval]}
          />
        )
      )}
    </>
  );
};

export default EventsList;
