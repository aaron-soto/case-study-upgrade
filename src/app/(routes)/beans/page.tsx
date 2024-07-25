import Image from "next/image";
import SectionHeading from "@/components/ui/section-heading";

const BEANS = [
  {
    title: "Single Origin",
    price: 15.0,
    description: "Delicious single origin coffee from around the world.",
    image:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRXJnvLLufoo9WN-0bCIgdkbMEwYtn5nF-NhfzAfxd_9mxnLEwO7NBqES9pbxVqhM8-cINGD1zOn2p0w3DVHsgZL6FluVPmXlSsIehwK94fJVZ7sjxfuCpfpg",
  },
  {
    title: "Decaf",
    price: 14.0,
    description: "Our best decaf coffee that doesn't compromise on flavor.",
    image:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRXJnvLLufoo9WN-0bCIgdkbMEwYtn5nF-NhfzAfxd_9mxnLEwO7NBqES9pbxVqhM8-cINGD1zOn2p0w3DVHsgZL6FluVPmXlSsIehwK94fJVZ7sjxfuCpfpg",
  },
  {
    title: "Blends",
    price: 16.0,
    description: "Our signature coffee blends that are loved by many.",
    image:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRXJnvLLufoo9WN-0bCIgdkbMEwYtn5nF-NhfzAfxd_9mxnLEwO7NBqES9pbxVqhM8-cINGD1zOn2p0w3DVHsgZL6FluVPmXlSsIehwK94fJVZ7sjxfuCpfpg",
  },
];

const BeansPage = () => {
  return (
    <section className="bg-[#0c0b09]">
      <div className="my-8 md:py-16">
        <div className="container">
          <SectionHeading
            title="Beans"
            description="Take home our best coffee"
          />

          <div className="flex flex-col md:flex-row gap-4 mt-8">
            {BEANS.map((bean) => {
              return (
                <div
                  key={bean.title}
                  className="flex flex-col items-center justify-center bg-stone-800/20 p-4 rounded-none"
                >
                  <Image
                    width={128}
                    height={128}
                    className="w-28 h-28 rounded object-contain mt-4 md:mt-0"
                    src={bean.image}
                    alt={bean.title}
                  />
                  <div className="w-full">
                    <h2 className="text-xl font-bold">{bean.title}</h2>
                    <p className="mt-4">{bean.description}</p>
                    <p className="mt-4">${bean.price}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeansPage;
