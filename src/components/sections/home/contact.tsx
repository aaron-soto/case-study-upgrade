"use client";

import {
  ChevronDown,
  ChevronUp,
  Clock,
  Locate,
  Mail,
  Phone,
} from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Map from "@/components/sections/home/map/Map";
import SectionHeading from "@/components/reusable/SectionHeading";
import { Textarea } from "@/components/ui/textarea";
import { formatPhoneNumber } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

const ContactItem = ({ icon: Icon, title, value }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDay, setCurrentDay] = useState("");

  useEffect(() => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const today = new Date().getDay();
    setCurrentDay(days[today]);
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const formatHours = (value: any) => (
    <div>
      <div className="flex gap-4 cursor-pointer" onClick={toggleDropdown}>
        <span className="col-span-1">{currentDay}:</span>
        <span className="flex items-center justify-between col-span-2">
          {value[currentDay]}
          <span className="ml-2">
            {isOpen ? <ChevronUp /> : <ChevronDown />}
          </span>
        </span>
      </div>
      {isOpen && (
        <div className="w-full">
          {Object.entries(value).map(([day, hours]: any, index) =>
            day !== currentDay ? (
              <div key={index} className="grid w-full grid-cols-2 gap-4">
                <span className="col-span-1">{day}:</span>
                <span className="col-span-1">{hours}</span>
              </div>
            ) : null
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="flex gap-4">
      <div className="flex items-center justify-center w-12 h-12 bg-orange-400 rounded-full">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <h4 className="text-lg font-bold">{title}:</h4>
        <div className="text-orange-400">
          {title === "Call" ? (
            <a href={`tel:${value}`} className="hover:underline">
              {formatPhoneNumber(value)}
            </a>
          ) : title === "Email" ? (
            <a href={`mailto:${value}`} className="hover:underline">
              {value}
            </a>
          ) : title === "Hours" ? (
            formatHours(value)
          ) : (
            value
          )}
        </div>
      </div>
    </div>
  );
};

const CONTACT_ITEMS = [
  {
    icon: Locate,
    title: "Location",
    value: "4802 N 16th st Phoenix, AZ",
  },
  {
    icon: Clock,
    title: "Hours",
    value: {
      Monday: "7AM - 1PM",
      Tuesday: "7AM - 1PM",
      Wednesday: "7AM - 1PM",
      Thursday: "7AM - 1PM",
      Friday: "7AM - 1PM",
      Saturday: "7AM - 1PM",
      Sunday: "7AM - 1PM",
    },
  },
  {
    icon: Mail,
    title: "Email",
    value: "william@casestudyphoenix.com",
  },
  {
    icon: Phone,
    title: "Call",
    value: "4805904270",
  },
];

const ContactSection = () => {
  const [isClient, setIsClient] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/emails/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        toast({
          title: "Success",
          description: "Message sent successfully.",
        });
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        toast({
          title: "Error",
          description: "Error sending message.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Error: " + error.message,
      });
    }
  };

  return (
    <section className="bg-[#0c0b09]">
      <div className="md:py-16">
        <div className="container">
          <SectionHeading title="Contact" description="Get in touch with us" />
        </div>
        <div className="my-8 w-full md:h-[300px] overflow-hidden">
          {isClient && <Map />}
        </div>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-3">
            <div className="flex flex-col col-span-2 gap-6 my-8 md:col-span-1">
              {CONTACT_ITEMS.map((item, index) => (
                <ContactItem key={index} {...item} />
              ))}
            </div>
            <div className="h-full col-span-2">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-center h-full gap-6 my-8 md:my-0"
              >
                <div className="flex flex-col gap-4 md:flex-row">
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-transparent"
                    placeholder="Your Name"
                  />
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-transparent"
                    placeholder="Your Email"
                  />
                </div>
                <Input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="bg-transparent"
                  placeholder="Subject"
                />
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="bg-transparent"
                  placeholder="Message"
                />
                <div className="flex justify-center col-span-2 mb-8 md:mb-0">
                  <Button
                    type="submit"
                    className="bg-orange-400 text-orange-950 hover:bg-orange-500 hover:text-orange-900"
                  >
                    Send Message
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
