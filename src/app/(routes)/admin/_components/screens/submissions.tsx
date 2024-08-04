"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React, { useEffect, useState } from "react";
import { capitalize, exportToExcel } from "@/lib/utils";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Reply } from "lucide-react";
import { db } from "@/lib/firebase";
import { toast } from "@/components/ui/use-toast";

const SubmissionPreview = (submission: any) => {
  return (
    <div className="flex flex-col p-4 w-[400px] bg-neutral-900/10 rounded-none">
      <p className="opacity-60 mb-2">
        {capitalize(submission.form)} Form Submission
      </p>
      <span className="text-lg font-semibold text-white">
        From: {submission.name}
      </span>
      <span className="text-sm text-gray-600">{submission.email}</span>
      <span className="text-sm text-gray-400">
        {submission.createdAt?.toLocaleString() || "Unknown date"}
      </span>
      <p>
        <span className="text-gray-400">Subject:</span> {submission.subject}
      </p>

      <p className="mt-2">
        <span className="text-gray-400">Message:</span> {submission.message}
      </p>

      <div className="flex mt-4 gap-4">
        <Button variant="outline" className="text-base" size="lg" asChild>
          <Link
            href={`mailto:${submission.email}?subject=${encodeURIComponent(
              `Re: ${submission.subject}`
            )}`}
          >
            Reply
          </Link>
        </Button>
        {/* <Button variant="destructive" className="text-base" size="lg">
          Delete
        </Button> */}
      </div>
    </div>
  );
};

const VenueRequestPreview = (submission: any) => {
  return (
    <div className="flex flex-col p-4 w-[400px] bg-neutral-900/10 rounded-none">
      <p className="opacity-60 mb-2">Venue Request Form Submission</p>
      <span className="text-lg font-semibold text-white">
        From: {submission.name}
      </span>
      <span className="text-sm text-gray-600">{submission.email}</span>
      <span className="text-sm text-gray-400">
        {submission.createdAt?.toLocaleString() || "Unknown date"}
      </span>
      <p>
        <span className="text-gray-400">Event Type:</span>{" "}
        {submission.eventType}
      </p>
      <p>
        <span className="text-gray-400">Event Date:</span>{" "}
        {submission.eventDate}
      </p>
      <p>
        <span className="text-gray-400">Number of Guests:</span>{" "}
        {submission.numberOfGuests}
      </p>

      <p className="mt-2">
        <span className="text-gray-400">Message:</span> {submission.message}
      </p>

      <div className="flex mt-4 gap-4">
        <Button variant="outline" className="text-base" size="lg" asChild>
          <Link
            href={`mailto:${submission.email}?subject=${encodeURIComponent(
              `Re: Venue Request - ${submission.eventType}`
            )}`}
          >
            Reply
          </Link>
        </Button>
        {/* <Button variant="destructive" className="text-base" size="lg">
          Delete
        </Button> */}
      </div>
    </div>
  );
};

const Submissions = () => {
  const [contactSubmissions, setContactSubmissions] = useState<any>([]);
  const [venueRequestSubmissions, setVenueRequestSubmissions] = useState<any>(
    []
  );

  useEffect(() => {
    // Create a query to order submissions by creation date
    const submissionsRef = collection(db, "submissions");
    const q = query(submissionsRef, orderBy("createdAt", "desc"));

    // Listen for real-time updates
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const submissions = snapshot.docs.map((doc) => {
        const data = doc.data();

        // Check if createdAt is a Firestore Timestamp
        let createdAt;
        if (data.createdAt?.toDate) {
          createdAt = data.createdAt.toDate(); // Firestore Timestamp
        } else if (data.createdAt instanceof Date) {
          createdAt = data.createdAt; // JavaScript Date
        } else if (typeof data.createdAt === "string") {
          createdAt = new Date(data.createdAt); // String
        } else {
          createdAt = null;
        }

        return {
          id: doc.id,
          ...data,
          createdAt,
        };
      });

      // Filter contact submissions
      const contactData = submissions.filter(
        (submission: any) => submission.form === "contact"
      );
      setContactSubmissions(contactData);

      const venueRequestData = submissions.filter(
        (submission: any) => submission.form === "venue-request"
      );
      setVenueRequestSubmissions(venueRequestData);
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);

  // const exportSubmissions = () => {
  //   const reformattedSubmissions = contactSubmissions.map(
  //     (submission: any) => ({
  //       Name: submission.name,
  //       Email: submission.email,
  //       Message: submission.message,
  //       Date: submission.createdAt?.toLocaleString(),
  //     })
  //   );
  //   exportToExcel(reformattedSubmissions, "contact_submissions");
  //   toast({
  //     title: "Submissions exported",
  //     description: "Submissions have been successfully exported",
  //   });
  // };

  return (
    <div className="flex flex-col items-center w-full lg:w-2/3 py-4">
      <div className="flex justify-between items-center w-full mb-4">
        <h1 className="text-2xl font-bold text-white">Submissions</h1>
      </div>

      <div className="w-full">
        <div className="px-2 md:px-4 py-1 bg-teal-600/50">Contact Form</div>
        {contactSubmissions.length > 0 ? (
          contactSubmissions.map((submission: any, idx: number) => (
            <Popover key={idx}>
              <PopoverTrigger asChild>
                <div className="flex justify-between w-full items-center bg-neutral-900/10 hover:bg-neutral-900/20 cursor-pointer md:px-4 py-2 rounded-none">
                  <div className="flex flex-col">
                    <span className="text-lg font-semibold text-white">
                      {submission.name}{" "}
                      <span className="text-sm text-gray-600">
                        {submission.email}
                      </span>
                    </span>

                    <span className="text-sm text-gray-400 line-clamp-1">
                      {submission.subject}
                    </span>
                  </div>
                  <span className="text-sm text-gray-400">
                    {submission.createdAt?.toLocaleString() || "Unknown date"}
                  </span>
                </div>
              </PopoverTrigger>
              <PopoverContent className="p-0 min-w-[400px]">
                <SubmissionPreview {...submission} />
              </PopoverContent>
            </Popover>
          ))
        ) : (
          <p className="text-gray-400">No contact submissions found.</p>
        )}
      </div>

      {/* VENUE REQUESTS */}
      <div className="w-full">
        <div className="px-2 md:px-4 py-1 bg-teal-600/50">
          Venue Request Form
        </div>
        {venueRequestSubmissions.length > 0 ? (
          venueRequestSubmissions.map((submission: any, idx: number) => (
            <Popover key={idx}>
              <PopoverTrigger asChild>
                <div className="flex justify-between w-full items-center bg-neutral-900/10 hover:bg-neutral-900/20 cursor-pointer md:px-4 py-2 rounded-none">
                  <div className="flex flex-col">
                    <span className="text-lg font-semibold text-white">
                      {submission.name}{" "}
                      <span className="text-sm text-gray-600">
                        {submission.email}
                      </span>
                    </span>

                    <span className="text-sm text-gray-400 line-clamp-1">
                      {submission.subject}
                    </span>
                  </div>
                  <span className="text-sm text-gray-400">
                    {submission.createdAt?.toLocaleString() || "Unknown date"}
                  </span>
                </div>
              </PopoverTrigger>
              <PopoverContent className="p-0 min-w-[400px]">
                <VenueRequestPreview {...submission} />
              </PopoverContent>
            </Popover>
          ))
        ) : (
          <p className="text-gray-400">No contact submissions found.</p>
        )}
      </div>
    </div>
  );
};

export default Submissions;
