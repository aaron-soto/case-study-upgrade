"use client";

import { addDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SectionHeading from "@/components/ui/section-heading";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/lib/firebase";
import { sanitizeInput } from "@/lib/utils";
import { useSiteSettingsStore } from "@/stores/SiteSettings";
import { useToast } from "@/components/ui/use-toast";

const VenueRequestPage = () => {
  const [isClient, setIsClient] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    numberOfGuests: "",
    message: "",
    honeypot: "",
  });
  const { toast } = useToast();
  const { siteSettings } = useSiteSettingsStore();
  const venueRequestNote = siteSettings.find(
    (setting) => setting.key === "venue-request-note"
  )?.value;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (formData.honeypot) {
      toast({
        title: "Error",
        description: "Spam detected.",
      });
      return;
    }

    try {
      const sanitizedFormData = {
        name: sanitizeInput(formData.name),
        email: sanitizeInput(formData.email),
        phone: sanitizeInput(formData.phone),
        eventType: sanitizeInput(formData.eventType),
        eventDate: sanitizeInput(formData.eventDate),
        numberOfGuests: sanitizeInput(formData.numberOfGuests),
        message: sanitizeInput(formData.message),
        honeypot: sanitizeInput(formData.honeypot),
      };

      const submissionRef = collection(db, "submissions");
      await addDoc(submissionRef, {
        ...sanitizedFormData,
        form: "venue-request",
      }).then(() => {
        toast({
          title: "Success",
          description: "Your venue request has been sent successfully",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          eventType: "",
          eventDate: "",
          numberOfGuests: "",
          message: "",
          honeypot: "",
        });
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Error: " + error.message,
      });
    }
  };

  return (
    <div className="bg-[#0c0b09] py-8">
      <div className="container">
        <SectionHeading
          title="Venue Request"
          description="Host your event at Case Study"
        />

        <p>{venueRequestNote}</p>

        <div className="my-8 max-w-[600px]">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="col-span-2 md:col-span-1 text-base"
                placeholder="Name"
              />
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="col-span-2 md:col-span-1 text-base"
                placeholder="Email"
              />
              <Input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="col-span-2 md:col-span-1 text-base"
                placeholder="Phone"
              />
              <Input
                type="text"
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                className="col-span-2 md:col-span-1 text-base"
                placeholder="Event Type"
              />
              <Input
                type="text"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                className="col-span-2 md:col-span-1 text-base"
                placeholder="Event Date"
              />
              <Input
                type="text"
                name="numberOfGuests"
                value={formData.numberOfGuests}
                onChange={handleChange}
                className="col-span-2 md:col-span-1 text-base"
                placeholder="Number of Guests"
              />
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="col-span-2 text-base"
                placeholder="Tell us a little about the event and what it's about..."
              />
              <Input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleChange}
                className="hidden"
              />
              <Button
                type="submit"
                variant="secondary"
                className="col-span-2 bg-orange-400 hover:bg-orange-300 md:col-span-1"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VenueRequestPage;
