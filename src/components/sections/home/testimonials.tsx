"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import SectionHeading from "@/components/ui/section-heading";

const TESTIMONIALS = [
  {
    name: "Richard Erickson",
    review:
      "Very kind and welcoming staff and owner. Always made to feel welcome and appreciated. Beautiful space filled with furniture gems of hardwood artistry.",
  },
  {
    name: "Sabina Okanovic",
    review:
      "Great coffee, vibes and pastries! Every time I stop in, my drinks seem to be made with quality and care and I have never not been satisfied with my drink! From their cold brew, drip, lattes or matcha, it is always delicious! Will definitely make it a priority to visit anytime we're back in PHX area!",
  },
  {
    name: "Michael Beauregard",
    review:
      "Case Study has a great vibe for a local coffee shop. The back room is an artist spot, and the decor was mid-century. My cappuccino was a bit nontraditional,  served in a glass, a bit wet. Taste, delish! If you are looking for a local spot, I highly recommend Case Study.",
  },
  {
    name: "Francis Riddle",
    review:
      "Hip quiet venue for coffee and pastries and breakfast fare. Lots of young people studying and socializing. Friendly staff. Very good cold brew and cappuccino. Excellent french toast",
  },
  {
    name: "Mike Colon",
    review:
      "The owner is an amazing craftsman! He is dedicated to making sure his customers have the best experience possible. He is quick to solve any problems or issues that may arise! The medium roast coffee that I had was delicious. Keep up the great work.",
  },
  {
    name: "Hudson Whittaker",
    review:
      "I learned that this started out as a showroom for the incredibly talented woodworker, William Douglas. So, understandably, they have the coolest furniture I've ever seen in a coffee shop.",
  },
];

const TestimonialsSection = () => {
  const [api, setApi]: any = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = () => {
      setCurrentIndex(api.selectedScrollSnap());
    };

    setCurrentIndex(api.selectedScrollSnap());
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <div className="bg-[#1a1814] w-full overflow-x-hidden">
      <div className="container py-16">
        <SectionHeading
          title="Testimonials"
          description="What they're saying about us"
        >
          <Link
            target="_blank"
            href="https://www.google.com/search?q=case+study+coffe+loung+google+reviews&oq=case+study+coffe+loung+google+reviews&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIJCAEQIRgKGKABMgkIAhAhGAoYoAEyCQgDECEYChirAtIBCDY0ODBqMGo3qAIIsAIB&sourceid=chrome&ie=UTF-8#"
            className="text-orange-400 underline hover:no-underline"
          >
            Leave a review
          </Link>
        </SectionHeading>

        <Carousel
          setApi={setApi}
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
          opts={{
            loop: true,
          }}
          className="mt-8 mb-2 md:mt-16"
        >
          <CarouselContent>
            {TESTIMONIALS.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="bg-[#26231d] p-6 rounded-[4px] h-fit">
                  <span className="font-serif text-4xl font-black text-orange-400">
                    &#8220;
                  </span>
                  <span className="text-lg italic font-normal leading-8">
                    {testimonial.review}
                  </span>
                  <span className="font-serif text-4xl font-black text-orange-400">
                    &#8221;
                  </span>
                </div>
                <p className="my-4 ml-8 font-serif text-lg font-semibold">
                  - {testimonial.name}
                </p>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <div className="flex justify-center">
          {TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`mx-1 w-2 h-2 rounded-full ${
                index === currentIndex ? "bg-orange-400" : "bg-gray-500"
              }`}
              onClick={() => api && api.scrollTo(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
