"use client";

import { useEffect, useState } from "react";

import EventListInterval from "@/components/sections/Anew/EventListInterval";
import { Interval } from "@/types/Events";
import { useEventStore } from "@/stores/EventStore";

interface EventsListProps {
  adminPage?: boolean;
}

const EventsList = ({ adminPage }: EventsListProps) => {
  const [loading, setLoading] = useState(true);
  const { fetchEvents, events } = useEventStore();

  useEffect(() => {
    fetchEvents().then(() => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

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
