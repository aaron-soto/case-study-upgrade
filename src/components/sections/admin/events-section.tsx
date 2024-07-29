"use client";

// import EventsList from "@/components/sections/admin/events-list";

import EventsList from "@/components/sections/Anew/EventsList";
import EventsToolbar from "@/components/sections/Anew/EventsToolbar";
import { Interval } from "@/types/Events";

// import EventsToolbar from "@/components/sections/admin/events-toolbar";

const EventSection = ({ adminPage }: { adminPage?: boolean }) => {
  return (
    <>
      <EventsToolbar />
      <EventsList adminPage />
      {/* <EventsToolbar />

      <EventsList adminPage={adminPage} type={Interval.TODAY} />
      <EventsList adminPage={adminPage} type={Interval.FUTURE} />
      <EventsList adminPage={adminPage} type={Interval.PAST} /> */}
    </>
  );
};

export default EventSection;
