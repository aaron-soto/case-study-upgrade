"use client";

import { motion, useInView } from "framer-motion";

import CaseStudyImage from "@/components/ui/case-study-image";
import { CircleCheckBig } from "lucide-react";
import Link from "next/link";
import SectionHeading from "@/components/ui/section-heading";
import { useRef } from "react";

interface AboutItemProps {
  text: string;
  className?: string;
}

const AboutItem: React.FC<AboutItemProps> = ({ text, className }) => (
  <li className={`flex items-center gap-4 ${className}`}>
    <CircleCheckBig className="w-6 h-6 text-orange-400" /> {text}
  </li>
);

const aboutItems = [
  "Friendly Staff",
  "Delicious Food and Drinks",
  "Good Vibes",
];

const AboutSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });

  return (
    <div className="bg-black">
      <div className="container py-16">
        <SectionHeading title="ABOUT" description="A little about Case Study" />
        <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2">
          <div className="order-2 col-span-1 md:order-1">
            <ul className="flex flex-col gap-[13px] my-8" ref={containerRef}>
              {aboutItems.map((item, idx) => (
                <motion.div
                  animate={{
                    opacity: isInView ? 1 : 0,
                    y: isInView ? 0 : 20,
                    transition: {
                      duration: 0.5,
                      delay: idx * 0.1,
                    },
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  key={idx}
                >
                  <AboutItem text={item} />
                </motion.div>
              ))}
            </ul>
            <motion.p
              className="leading-relaxed"
              animate={{
                opacity: isInView ? 1 : 0,
                y: isInView ? 0 : 20,
                transition: {
                  duration: 0.5,
                },
              }}
              initial={{ opacity: 0, y: 20 }}
            >
              Case Study is a coffee lounge that started out as a showroom for
              furniture designer/maker “
              <Link
                className="text-orange-400 underline hover:no-underline"
                href="https://www.youtube.com/@WilliamDouglasCo/featured"
              >
                William Douglas
              </Link>{" "}
              ” - A native to Phoenix, AZ and world class woodworker. He wanted
              a space for clients to come in and enjoy the furniture instead of
              admiring from a screen. As the local community&apos;s curiosity
              brought them in, they were in “awe” of not only the woodworking
              but also the specialty coffee! They quickly demanded that it be
              open to the public for everyone&apos;s enjoyment! The people have
              spoken, and the rest is history. This concept has since been
              re-created by other craftsman as William&apos;s case study yet
              again paved the way.
            </motion.p>
            <p className="my-4">
              Check out the{" "}
              <Link
                className="text-orange-400 underline hover:no-underline"
                href="https://www.instagram.com/casestudycoffeelounge/"
              >
                CaseStudy Instagram account
              </Link>
              !
            </p>
          </div>
          <CaseStudyImage
            src="https://casestudyphoenix.com/assets/img/case-study/feb_2024/DSC00148.jpg"
            alt="Will with customers"
            width={600}
            height={400}
            className="order-1 object-cover h-full transition-transform duration-200 rounded-md md:order-2 md:hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
