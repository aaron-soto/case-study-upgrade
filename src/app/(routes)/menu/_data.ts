import { v4 as uuidv4 } from "uuid";

export type Category =
  | "Noble"
  | "Coffee"
  | "Specialty"
  | "Teas"
  | "No Caffeine!"
  | "Food"
  | "Fridge Retail"
  | "Form Floral";

interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: Category;
  imageUrl?: string;
}

const menuItems: MenuItem[] = [
  // Noble items
  {
    id: uuidv4(),
    name: "GF Banana Muffin",
    price: 4.5,
    category: "Noble",
  },
  {
    id: uuidv4(),
    name: "Everything Bagel",
    price: 5.0,
    category: "Noble",
  },
  {
    id: uuidv4(),
    name: "Everything Bagel With Cream Cheese",
    price: 5.0,
    category: "Noble",
  },
  // Coffee items
  {
    id: uuidv4(),
    name: "Drip Coffee",
    price: 4.0,
    category: "Coffee",
  },
  {
    id: uuidv4(),
    name: "Cold Brew",
    price: 6.0,
    category: "Coffee",
  },
  {
    id: uuidv4(),
    name: "Espresso",
    price: 4.0,
    category: "Coffee",
  },
  {
    id: uuidv4(),
    name: "Americano",
    price: 4.0,
    category: "Coffee",
  },
  {
    id: uuidv4(),
    name: "Macchiato",
    price: 4.0,
    category: "Coffee",
  },
  {
    id: uuidv4(),
    name: "Cortado",
    price: 5.0,
    category: "Coffee",
  },
  {
    id: uuidv4(),
    name: "Cappuccino",
    price: 5.0,
    category: "Coffee",
  },
  {
    id: uuidv4(),
    name: "Latte",
    price: 6.0,
    category: "Coffee",
  },
  // Specialty items
  {
    id: uuidv4(),
    name: "Honey Lavender Latte",
    price: 7.0,
    category: "Specialty",
  },
  {
    id: uuidv4(),
    name: "Vanilla Rosemary Latte",
    price: 7.0,
    category: "Specialty",
  },
  {
    id: uuidv4(),
    name: "Brown Sugar Sage Latte",
    price: 7.0,
    category: "Specialty",
  },
  {
    id: uuidv4(),
    name: "Golden Latte",
    price: 7.0,
    category: "Specialty",
  },
  {
    id: uuidv4(),
    name: "Summer Daze",
    price: 9.25,
    category: "Specialty",
  },
  // Teas items
  {
    id: uuidv4(),
    name: "Chai Latte",
    price: 6.0,
    category: "Teas",
  },
  {
    id: uuidv4(),
    name: "Matcha Latte",
    price: 7.0,
    category: "Teas",
  },
  {
    id: uuidv4(),
    name: "Earl Gray",
    price: 5.0,
    category: "Teas",
  },
  {
    id: uuidv4(),
    name: "Golden Yunnan",
    price: 6.0,
    category: "Teas",
  },
  {
    id: uuidv4(),
    name: "Cinnamon Plum",
    price: 5.0,
    category: "Teas",
  },
  {
    id: uuidv4(),
    name: "London Fog",
    price: 7.0,
    category: "Teas",
  },
  {
    id: uuidv4(),
    name: "Vanilla Mint Sencha Green",
    price: 5.0,
    category: "Teas",
  },
  {
    id: uuidv4(),
    name: "Matcha (Shot Only)",
    price: 4.0,
    category: "Teas",
  },
  // No Caffeine! items
  {
    id: uuidv4(),
    name: "Steamer / Milk",
    price: 4.0,
    category: "No Caffeine!",
  },
  {
    id: uuidv4(),
    name: "Apple Butter Cider",
    description:
      "This delicious caffeine free beverage has a ginger beer base with apple butter sauce and pomegranate!",
    price: 7.0,
    category: "No Caffeine!",
  },
  // Food items
  {
    id: uuidv4(),
    name: "Avocado Toast",
    description:
      "Lime Soaked Red Onions, Avocado, Goat Cheese, Cherry Tomatoes, Sourdough Bread",
    price: 11.0,
    category: "Food",
  },
  {
    id: uuidv4(),
    name: "Bacon Egg Potato And Cheese",
    description: "Bacon Egg Potato And Cheese Burrito",
    price: 15.0,
    category: "Food",
  },
  // Fridge Retail items
  {
    id: uuidv4(),
    name: "Smart Water",
    description: "1 Liter",
    price: 3.0,
    category: "Fridge Retail",
  },
  {
    id: uuidv4(),
    name: "Topo Chico",
    description: "12oz Glass",
    price: 2.75,
    category: "Fridge Retail",
  },
  // Form Floral items
  {
    id: uuidv4(),
    name: "Pink Blooms",
    description:
      "This beautiful arrangement is created by Form Floral in Phoenix. The collaboration includes a drink carrier that holds the arrangement on one side and your valentines favorite drink on the other side! (Drink sold separately)",
    price: 35.0,
    category: "Form Floral",
  },
  {
    id: uuidv4(),
    name: "Wildflower Blooms",
    description:
      "This beautiful arrangement is created by Form Floral in Phoenix. The collaboration includes a drink carrier that holds the arrangement on one side and your valentines favorite drink on the other side! (Drink sold separately)",
    price: 35.0,
    category: "Form Floral",
  },
];

export default menuItems;
