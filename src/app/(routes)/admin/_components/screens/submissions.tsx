"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase";

const fetchSubmissions = async () => {
  const submissionsRef = collection(db, "submissions");
  const snapshot = await getDocs(submissionsRef);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate(),
  }));
};

const Submissions = () => {
  const [contactSubmissions, setContactSubmissions] = useState<any>([]);
  const [newsletterSubmissions, setNewsletterSubmissions] = useState<any>([]);

  useEffect(() => {
    fetchSubmissions().then((data) => {
      const contactData = data.filter(
        (submission: any) => submission.form === "contact"
      );
      const newsletterData = data.filter(
        (submission: any) => submission.form === "newsletter"
      );
      setContactSubmissions(contactData);
      setNewsletterSubmissions(newsletterData);
    });
  }, []);

  return (
    <div className="flex flex-col items-center w-full p-4">
      <div className="flex justify-between items-center w-full mb-4">
        <h1 className="text-2xl font-bold text-white">Submissions</h1>
        <Button variant="secondary" disabled className="rounded-none">
          Export Submissions
        </Button>
      </div>

      <div className="w-full">
        <div className="px-2 py-1 bg-teal-600/50">Contact Form</div>
        {contactSubmissions.length > 0 ? (
          contactSubmissions.map((submission: any, index: number) => (
            <div
              key={index}
              className="flex justify-between items-center bg-neutral-900/30 px-4 py-2 rounded-none"
            >
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-white">
                  {submission.name}
                </span>
                <span className="text-sm text-gray-400">
                  {submission.email}
                </span>
                <span className="text-sm text-gray-400">
                  {submission.message}
                </span>
              </div>
              <span className="text-sm text-gray-400">
                {submission.createdAt?.toLocaleString()}
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No contact submissions found.</p>
        )}

        <div className="px-2 py-1 bg-teal-600/50 mt-4">Newsletter Form</div>
        {newsletterSubmissions.length > 0 ? (
          newsletterSubmissions.map((submission: any, index: number) => (
            <div
              key={index}
              className="flex justify-between items-center bg-neutral-900/30 px-4 py-2 rounded-none"
            >
              <span className="text-lg font-semibold text-white">
                {submission.email}
              </span>
              <span className="text-sm text-gray-400">
                {submission.createdAt?.toLocaleString()}
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No newsletter submissions found.</p>
        )}
      </div>
    </div>
  );
};

export default Submissions;
