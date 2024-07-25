import CaseStudyImage from "@/components/ui/case-study-image";
import { CircleCheckBig } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/ui/section-heading";

const AboutSection = () => {
  return (
    <div className="bg-black">
      <div className="container py-16">
        <SectionHeading title="ABOUT" description="A little about Case Study">
          {/* <Link href="/" className="text-orange-400 underline hover:no-underline">See more google reviews</Link> */}
        </SectionHeading>
        <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2">
          <div className="order-2 col-span-1 md:order-1">
            <ul className="flex flex-col gap-[13px] my-8">
              <li className="flex items-center gap-4">
                <CircleCheckBig className="w-6 h-6 text-orange-400" /> Friendly
                Staff
              </li>
              <li className="flex items-center gap-4">
                <CircleCheckBig className="w-6 h-6 text-orange-400" /> Delicious
                Food and Drinks
              </li>
              <li className="flex items-center gap-4">
                <CircleCheckBig className="w-6 h-6 text-orange-400" /> Good
                Times
              </li>
            </ul>
            <p className="leading-relaxed">
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
            </p>
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
          ></CaseStudyImage>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
