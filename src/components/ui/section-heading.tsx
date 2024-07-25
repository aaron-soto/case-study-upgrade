import { Playfair_Display } from "next/font/google";
import { cn } from "@/lib/utils";

const playfairDisplay = Playfair_Display({ subsets: ["latin"] });

interface SectionHeadingProps {
  title: string;
  description: string;
  children?: React.ReactNode;
  className?: string;
}

const SectionHeading = ({
  title,
  description,
  children,
  className = "",
}: SectionHeadingProps) => {
  return (
    <div className={className}>
      <h2 className="flex items-center gap-4 text-teal-600 uppercase">
        {title}
        <div className="bg-orange-400 w-[100px] h-[2px]" />
      </h2>
      <h3
        className={cn(
          "md:mb-2 text-4xl font-[600] text-orange-400",
          playfairDisplay.className
        )}
      >
        {description}
      </h3>
      {children}
    </div>
  );
};

export default SectionHeading;
