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
    name: "John Doe",
    review:
      "Delicious coffee, cozy atmosphere, and outstanding customer service. Will greeted us with a warm smile and hello. Vera made great suggestions on menu items and whipped up a wicked latte. Casey wrapped up our morning with a friendly conversation. Case Study has outdone itself!",
  },
  {
    name: "Jane Smith",
    review:
      "Amazing espresso and friendly staff! I love the ambiance; it's perfect for getting some work done or catching up with friends. The pastries are to die for. Highly recommended!",
  },
  {
    name: "Michael Brown",
    review:
      "Best coffee in town! The baristas are knowledgeable and passionate about their craft. The cold brew is a must-try. I'll definitely be coming back regularly.",
  },
  {
    name: "Emily Johnson",
    review:
      "A hidden gem! The decor is charming, and the coffee is fantastic. The staff is always so welcoming and helpful. I love spending my afternoons here.",
  },
  {
    name: "Chris Davis",
    review:
      "Top-notch coffee and a great place to relax. The cappuccinos are superb, and the staff always make you feel right at home. Highly recommend visiting!",
  },
  {
    name: "Sarah Wilson",
    review:
      "This place is a coffee lover's dream. The variety of beans and brewing methods is impressive. The atmosphere is both vibrant and relaxing. A must-visit spot!",
  },
  {
    name: "David Martinez",
    review:
      "Fantastic experience every time I visit. The coffee is consistently excellent, and the staff are always friendly and attentive. Perfect for coffee enthusiasts.",
  },
  {
    name: "Laura Taylor",
    review:
      "Wonderful coffee shop with a great selection of drinks and snacks. The vibe is always positive, and the staff go above and beyond to make you feel welcome. Love it here!",
  },
  {
    name: "James Anderson",
    review:
      "Hands down, the best coffee shop in the area. The atmosphere is perfect for both work and relaxation. The coffee is always fresh and delicious. Can't recommend it enough!",
  },
  {
    name: "Patricia Thomas",
    review:
      "Incredible coffee and a delightful atmosphere. The baristas are skilled and friendly, always making sure you have a great experience. A true gem in the city!",
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
            href="/"
            className="text-orange-400 underline hover:no-underline"
          >
            See more google reviews
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
