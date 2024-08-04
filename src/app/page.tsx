import AboutSection from "@/components/sections/home/about";
import ContactSection from "@/components/sections/contact/contact";
import EventsSection from "@/components/sections/home/events";
import GallerySection from "@/components/sections/home/gallery";
import HeroSection from "@/components/sections/home/hero";
import Link from "next/link";
import TestimonialsSection from "@/components/sections/home/testimonials";

const Star = () => {
  return (
    <svg
      height="800px"
      width="800px"
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 47.94 47.94"
      className="h-10 w-10 md:h-6 md:w-6 text-teal-600 animate-pulse"
    >
      <path
        fill="currentColor"
        d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757
	c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042
	c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685
	c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528
	c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956
	C22.602,0.567,25.338,0.567,26.285,2.486z"
      />
    </svg>
  );
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <div className="bg-white text-black">
        <Link
          href="https://www.phoenixnewtimes.com/best-of-phoenix-readers-choice-poll"
          className="cursor-pointer hover:underline"
        >
          <div className="container py-4 flex gap-4 justify-center items-center">
            <Star />
            <p className="text-lg text-center justify-center font-semibold">
              Click here to vote for us in Phoenix New Times&apos; Best of
              Phoenix!
            </p>
            <Star />
          </div>
        </Link>
      </div>
      <EventsSection />
      <AboutSection />
      <TestimonialsSection />
      <GallerySection />
      <ContactSection />
    </>
  );
}
