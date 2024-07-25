import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import menuItems, { Category } from "@/app/(routes)/menu/_data";

import SectionHeading from "@/components/ui/section-heading";

const MenuItem = ({ name, description, price }: any) => {
  return (
    <div className="flex flex-col items-start justify-between cursor-pointer p-4 border-gray-800 bg-transparent hover:bg-neutral-800/20 md:border-none md:bg-transparent">
      <div>
        <h4 className="text-lg font-semibold text-white">{name}</h4>
        <p className="text-gray-400">{description}</p>
      </div>
      <p className="text-lg font-semibold text-white mt-2 md:mt-0">${price}</p>
    </div>
  );
};

const MenuPage = () => {
  const categories: Category[] = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Drinks",
    "Snacks",
    "Desserts",
  ];

  return (
    <section className="bg-[#0c0b09] py-8 md:py-16">
      <div className="container mx-auto px-4">
        <SectionHeading title="Menu" description="Check out our menu" />

        <Tabs defaultValue="Breakfast" className="mt-8">
          <TabsList className="flex flex-wrap justify-center bg-transparent gap-2 md:gap-4">
            {categories.map((category) => {
              return (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="py-3 px-4 text-white w-[120px] bg-gray-800 rounded-none cursor-pointer data-[state=active]:bg-neutral-700 bg-neutral-800/20 hover:bg-neutral-800/20"
                >
                  {category}
                </TabsTrigger>
              );
            })}
          </TabsList>
          {categories.map((category) => {
            return (
              <TabsContent key={category} value={category} className="mt-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {
                    // Filter the menu items by category and create a menu item component for each one
                    menuItems
                      .filter((item) => item.category === category)
                      .map((item) => {
                        return (
                          <MenuItem
                            key={item.id}
                            name={item.name}
                            description={item.description}
                            price={item.price}
                          />
                        );
                      })
                  }
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
};

export default MenuPage;
