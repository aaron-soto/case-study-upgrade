"use client";

import { EventFilterTypes } from "@/types/Events";
import EventsList from "@/components/sections/admin/events-list";
import EventsToolbar from "@/components/sections/admin/events-toolbar";

const EventSection = ({ adminPage }: { adminPage?: boolean }) => {
  return (
    <>
      <EventsToolbar />

      <EventsList adminPage={adminPage} type={EventFilterTypes.TODAY} />
      <EventsList adminPage={adminPage} type={EventFilterTypes.FUTURE} />
      <EventsList adminPage={adminPage} type={EventFilterTypes.PAST} />
    </>
  );
};

export default EventSection;
