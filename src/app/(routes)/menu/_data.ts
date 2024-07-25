import { v4 as uuidv4 } from "uuid";

export type Category =
  | "Breakfast"
  | "Lunch"
  | "Dinner"
  | "Drinks"
  | "Snacks"
  | "Desserts";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  imageUrl: string;
}

const menuItems: MenuItem[] = [
  // Breakfast items
  {
    id: uuidv4(),
    name: "Avocado Toast",
    description: "Fresh avocado on toasted whole grain bread.",
    price: 6.5,
    category: "Breakfast",
    imageUrl: "https://example.com/images/avocado-toast.jpg",
  },
  {
    id: uuidv4(),
    name: "Breakfast Burrito",
    description:
      "A hearty burrito filled with eggs, cheese, and your choice of bacon or sausage.",
    price: 7.5,
    category: "Breakfast",
    imageUrl: "https://example.com/images/breakfast-burrito.jpg",
  },
  {
    id: uuidv4(),
    name: "Pancakes",
    description: "Stack of fluffy pancakes served with syrup and butter.",
    price: 5.0,
    category: "Breakfast",
    imageUrl: "https://example.com/images/pancakes.jpg",
  },
  {
    id: uuidv4(),
    name: "Omelette",
    description: "Three-egg omelette with your choice of fillings.",
    price: 6.0,
    category: "Breakfast",
    imageUrl: "https://example.com/images/omelette.jpg",
  },
  {
    id: uuidv4(),
    name: "Bagel with Cream Cheese",
    description: "Freshly baked bagel with a generous spread of cream cheese.",
    price: 3.0,
    category: "Breakfast",
    imageUrl: "https://example.com/images/bagel-cream-cheese.jpg",
  },
  {
    id: uuidv4(),
    name: "Fruit Parfait",
    description: "Layers of fresh fruit, yogurt, and granola.",
    price: 4.5,
    category: "Breakfast",
    imageUrl: "https://example.com/images/fruit-parfait.jpg",
  },
  // Lunch items
  {
    id: uuidv4(),
    name: "Turkey Club Sandwich",
    description:
      "Classic club sandwich with turkey, bacon, lettuce, and tomato on toasted bread.",
    price: 8.5,
    category: "Lunch",
    imageUrl: "https://example.com/images/turkey-club.jpg",
  },
  {
    id: uuidv4(),
    name: "Caesar Salad",
    description:
      "Fresh romaine lettuce with Caesar dressing, croutons, and parmesan cheese.",
    price: 7.0,
    category: "Lunch",
    imageUrl: "https://example.com/images/caesar-salad.jpg",
  },
  {
    id: uuidv4(),
    name: "Veggie Wrap",
    description:
      "Whole wheat wrap filled with hummus, fresh vegetables, and feta cheese.",
    price: 6.5,
    category: "Lunch",
    imageUrl: "https://example.com/images/veggie-wrap.jpg",
  },
  {
    id: uuidv4(),
    name: "Chicken Caesar Wrap",
    description:
      "Grilled chicken with romaine lettuce, Caesar dressing, and parmesan in a whole wheat wrap.",
    price: 7.5,
    category: "Lunch",
    imageUrl: "https://example.com/images/chicken-caesar-wrap.jpg",
  },
  {
    id: uuidv4(),
    name: "BLT Sandwich",
    description: "Bacon, lettuce, and tomato on toasted bread with mayonnaise.",
    price: 6.5,
    category: "Lunch",
    imageUrl: "https://example.com/images/blt.jpg",
  },
  {
    id: uuidv4(),
    name: "Quinoa Salad",
    description:
      "Quinoa mixed with fresh vegetables, feta cheese, and a lemon vinaigrette.",
    price: 7.5,
    category: "Lunch",
    imageUrl: "https://example.com/images/quinoa-salad.jpg",
  },
  // Dinner items
  {
    id: uuidv4(),
    name: "Grilled Chicken Dinner",
    description:
      "Grilled chicken breast served with roasted vegetables and mashed potatoes.",
    price: 12.0,
    category: "Dinner",
    imageUrl: "https://example.com/images/grilled-chicken.jpg",
  },
  {
    id: uuidv4(),
    name: "Pasta Primavera",
    description:
      "Pasta with a medley of fresh vegetables in a light garlic sauce.",
    price: 10.0,
    category: "Dinner",
    imageUrl: "https://example.com/images/pasta-primavera.jpg",
  },
  {
    id: uuidv4(),
    name: "Steak and Fries",
    description: "Juicy steak served with crispy fries and a side salad.",
    price: 15.0,
    category: "Dinner",
    imageUrl: "https://example.com/images/steak-fries.jpg",
  },
  {
    id: uuidv4(),
    name: "Salmon Fillet",
    description:
      "Grilled salmon fillet served with quinoa and steamed vegetables.",
    price: 14.0,
    category: "Dinner",
    imageUrl: "https://example.com/images/salmon-fillet.jpg",
  },
  {
    id: uuidv4(),
    name: "Vegetarian Stir Fry",
    description:
      "Mixed vegetables stir-fried with tofu and a savory sauce, served over rice.",
    price: 11.0,
    category: "Dinner",
    imageUrl: "https://example.com/images/vegetarian-stir-fry.jpg",
  },
  {
    id: uuidv4(),
    name: "Beef Tacos",
    description:
      "Three beef tacos with lettuce, cheese, and salsa, served with a side of rice and beans.",
    price: 10.5,
    category: "Dinner",
    imageUrl: "https://example.com/images/beef-tacos.jpg",
  },
  // Beverages
  {
    id: uuidv4(),
    name: "Espresso",
    description: "Rich and bold espresso shot.",
    price: 2.5,
    category: "Drinks",
    imageUrl: "https://example.com/images/espresso.jpg",
  },
  {
    id: uuidv4(),
    name: "Cappuccino",
    description: "Espresso with steamed milk and a light layer of foam.",
    price: 3.5,
    category: "Drinks",
    imageUrl: "https://example.com/images/cappuccino.jpg",
  },
  {
    id: uuidv4(),
    name: "Smoothie",
    description: "Refreshing smoothie made with fresh fruits and yogurt.",
    price: 4.5,
    category: "Drinks",
    imageUrl: "https://example.com/images/smoothie.jpg",
  },
  {
    id: uuidv4(),
    name: "Iced Coffee",
    description: "Cold brew coffee served over ice.",
    price: 3.0,
    category: "Drinks",
    imageUrl: "https://example.com/images/iced-coffee.jpg",
  },
  {
    id: uuidv4(),
    name: "Herbal Tea",
    description: "A variety of herbal teas to choose from.",
    price: 2.0,
    category: "Drinks",
    imageUrl: "https://example.com/images/herbal-tea.jpg",
  },
  {
    id: uuidv4(),
    name: "Hot Chocolate",
    description: "Rich hot chocolate topped with whipped cream.",
    price: 3.5,
    category: "Drinks",
    imageUrl: "https://example.com/images/hot-chocolate.jpg",
  },
  // Snacks
  {
    id: uuidv4(),
    name: "Granola Bar",
    description: "Homemade granola bar with nuts and dried fruits.",
    price: 2.0,
    category: "Snacks",
    imageUrl: "https://example.com/images/granola-bar.jpg",
  },
  {
    id: uuidv4(),
    name: "Fruit Cup",
    description: "Assorted fresh fruits in a convenient cup.",
    price: 3.0,
    category: "Snacks",
    imageUrl: "https://example.com/images/fruit-cup.jpg",
  },
  {
    id: uuidv4(),
    name: "Hummus and Veggies",
    description: "Creamy hummus served with fresh vegetable sticks.",
    price: 3.5,
    category: "Snacks",
    imageUrl: "https://example.com/images/hummus-veggies.jpg",
  },
  {
    id: uuidv4(),
    name: "Trail Mix",
    description: "A mix of nuts, dried fruits, and chocolate pieces.",
    price: 2.5,
    category: "Snacks",
    imageUrl: "https://example.com/images/trail-mix.jpg",
  },
  {
    id: uuidv4(),
    name: "Yogurt Cup",
    description: "Plain or flavored yogurt in a cup.",
    price: 2.0,
    category: "Snacks",
    imageUrl: "https://example.com/images/yogurt-cup.jpg",
  },
  {
    id: uuidv4(),
    name: "Cheese and Crackers",
    description: "Assorted cheeses served with crackers.",
    price: 3.5,
    category: "Snacks",
    imageUrl: "https://example.com/images/cheese-crackers.jpg",
  },
  // Desserts
  {
    id: uuidv4(),
    name: "Chocolate Cake",
    description: "Rich and moist chocolate cake with a creamy frosting.",
    price: 4.0,
    category: "Desserts",
    imageUrl: "https://example.com/images/chocolate-cake.jpg",
  },
  {
    id: uuidv4(),
    name: "Cheesecake",
    description: "Classic cheesecake with a graham cracker crust.",
    price: 4.5,
    category: "Desserts",
    imageUrl: "https://example.com/images/cheesecake.jpg",
  },
  {
    id: uuidv4(),
    name: "Brownie",
    description: "Decadent chocolate brownie with a fudgy center.",
    price: 3.0,
    category: "Desserts",
    imageUrl: "https://example.com/images/brownie.jpg",
  },
  {
    id: uuidv4(),
    name: "Apple Pie",
    description: "Classic apple pie with a flaky crust.",
    price: 4.0,
    category: "Desserts",
    imageUrl: "https://example.com/images/apple-pie.jpg",
  },
  {
    id: uuidv4(),
    name: "Ice Cream Sundae",
    description:
      "Vanilla ice cream topped with chocolate sauce, whipped cream, and a cherry.",
    price: 3.5,
    category: "Desserts",
    imageUrl: "https://example.com/images/ice-cream-sundae.jpg",
  },
  {
    id: uuidv4(),
    name: "Lemon Tart",
    description: "Tangy lemon tart with a buttery crust.",
    price: 4.0,
    category: "Desserts",
    imageUrl: "https://example.com/images/lemon-tart.jpg",
  },
];

export default menuItems;
