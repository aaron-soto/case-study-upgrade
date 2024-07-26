"use client";

import { addDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { date } from "zod";
import { db } from "@/lib/firebase";
import { sanitizeInput } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(sanitizeInput(value));
    } else if (name === "honeypot") {
      setHoneypot(sanitizeInput(value));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (honeypot) {
      toast({
        title: "Error",
        description: "Spam detected.",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address.",
      });
      return;
    }

    try {
      // TODO: add check to db before adding
      const submissionRef = collection(db, "submissions");
      await addDoc(submissionRef, {
        email: email,
        form: "newsletter",
      }).then(() => {
        toast({
          title: "Success",
          description: "You have successfully subscribed to the newsletter!",
        });
        setSubmitted(true);
        setEmail("");
        setHoneypot("");
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Error: " + error.message,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-2 bg-[#1e1c19]">
      <div className="w-full max-w-md bg-[#121212] rounded-none shadow-md p-6">
        <h2 className="text-2xl font-bold text-white mb-4">
          Subscribe to Our Newsletter
        </h2>

        {submitted ? (
          <p className="text-center text-green-500">
            Thank you for subscribing!
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col">
            <Input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              className="text-white border-0 rounded-none p-2 mb-4 transition ease-in-out duration-150"
              placeholder="Enter your email address"
            />
            <Input
              type="text"
              name="honeypot"
              value={honeypot}
              onChange={handleChange}
              className="hidden"
            />
            <Button
              type="submit"
              className="bg-orange-800 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-none mt-4 transition ease-in-out duration-150"
            >
              Subscribe
            </Button>
          </form>
        )}

        <div className="flex justify-center mt-4">
          <a href="#" className="text-sm text-gray-600 hover:underline">
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
