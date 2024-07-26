import AboutSection from "@/components/sections/home/about";
import ContactSection from "@/components/sections/contact/contact";
import EventsSection from "@/components/sections/home/events";
import GallerySection from "@/components/sections/home/gallery";
import HeroSection from "@/components/sections/home/hero";
import Newsletter from "@/components/sections/home/newsletter";
import TestimonialsSection from "@/components/sections/home/testimonials";

export default function Home() {
  return (
    <>
      <HeroSection />
      <EventsSection />
      <AboutSection />
      <TestimonialsSection />
      <GallerySection />
      <Newsletter />
      <ContactSection />
    </>
  );
}
