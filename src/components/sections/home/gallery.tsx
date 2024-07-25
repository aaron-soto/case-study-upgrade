import CaseStudyImage from "@/components/ui/case-study-image";
import SectionHeading from "@/components/ui/section-heading";

const IMAGES = [
  "https://casestudyphoenix.com/assets/img/case-study/feb_2024/DSC00002.jpg",
  "https://casestudyphoenix.com/assets/img/case-study/feb_2024/DSC00004.jpg",
  "https://casestudyphoenix.com/assets/img/case-study/feb_2024/DSC00026.jpg",
  "https://casestudyphoenix.com/assets/img/case-study/feb_2024/DSC00028.jpg",
  "https://casestudyphoenix.com/assets/img/case-study/feb_2024/DSC00118.jpg",
  "https://casestudyphoenix.com/assets/img/case-study/feb_2024/DSC00121.jpg",
  "https://casestudyphoenix.com/assets/img/case-study/feb_2024/DSC00132.jpg",
  "https://casestudyphoenix.com/assets/img/case-study/feb_2024/DSC00148.jpg",
];

const GallerySection = () => {
  return (
    <div className="bg-[#0c0b09]">
      <div className="py-16">
        <div className="container">
          <SectionHeading
            title="Gallery"
            description="Some photos from the Shop"
          />
        </div>
        <div className="grid grid-cols-1 mt-16 overflow-hidden md:grid-cols-4">
          {IMAGES.map((image, index) => (
            <div
              key={index}
              className="relative col-span-1 overflow-hidden group"
            >
              <CaseStudyImage
                src={image}
                alt="gallery"
                width={800}
                height={600}
                className="md:group-hover:scale-105 w-full h-[250px] transition-transform cursor-pointer object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GallerySection;
