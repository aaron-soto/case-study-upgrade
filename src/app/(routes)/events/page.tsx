import EventsList from "@/components/sections/Anew/EventsList";
import EventsListWrapper from "@/components/sections/Anew/EventsListWrapper";
import Link from "next/link";
import React from "react";
import SectionHeading from "@/components/ui/section-heading";

const page = () => {
  return (
    <div className="py-8">
      <div className="container">
        <SectionHeading
          className="mb-8"
          title="Events"
          description="What is happening at Case Study"
        >
          <p>
            Fill out our{" "}
            <Link
              className="text-orange-400 hover:text-orange-300 underline underline-offset-2 hover:no-underline"
              href="/venue-request"
            >
              venue request form
            </Link>{" "}
            to host your event at Case Study!
          </p>
        </SectionHeading>
        <EventsList />
      </div>
    </div>
  );
};

export default page;
