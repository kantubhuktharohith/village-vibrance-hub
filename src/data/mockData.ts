import village1 from "@/assets/village-1.jpg";
import village2 from "@/assets/village-2.jpg";
import village3 from "@/assets/village-3.jpg";
import dish1 from "@/assets/dish-1.jpg";
import dish2 from "@/assets/dish-2.jpg";
import dish3 from "@/assets/dish-3.jpg";

export interface Village {
  id: string;
  name: string;
  region: string;
  rating: number;
  reviews: number;
  verified: boolean;
  image: string;
  startingPrice: number;
  description: string;
  highlights: string[];
  experiences: Experience[];
  stays: Stay[];
  fundContribution: number;
  fundProject: string;
  fundProgress: number;
}

export interface Experience {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  included: string[];
  safety: string[];
  image: string;
  villageId: string;
  villageName: string;
}

export interface Stay {
  id: string;
  title: string;
  price: number;
  image: string;
}

export interface Dish {
  id: string;
  name: string;
  villageName: string;
  villageId: string;
  image: string;
  spiceLevel: number;
  vegetarian: boolean;
  seasonal: boolean;
  story: string;
  ingredients: string[];
  cookingClassPrice: number;
}

export interface Booking {
  id: string;
  villageName: string;
  experienceTitle: string;
  date: string;
  status: "upcoming" | "completed";
  price: number;
  image: string;
}

export const villages: Village[] = [
  {
    id: "v1",
    name: "Kumbalgarh Heritage",
    region: "Rajasthan, India",
    rating: 4.8,
    reviews: 124,
    verified: true,
    image: village1,
    startingPrice: 45,
    description: "Nestled in the Aravalli hills, this village offers authentic Rajasthani culture with historic fort walks, traditional cooking, and stargazing in the Thar desert fringe.",
    highlights: ["Heritage Fort Walk", "Desert Stargazing", "Traditional Pottery"],
    experiences: [
      {
        id: "e1",
        title: "Heritage Fort Trail & Village Walk",
        description: "Walk through centuries-old fort ruins and explore the village with a local historian guide. Learn about Rajput architecture, local legends, and rural life traditions.",
        price: 45,
        duration: "4 hours",
        included: ["Local guide", "Traditional lunch", "Water & snacks", "Fort entry"],
        safety: ["First aid kit available", "Emergency contact provided", "Shaded rest points"],
        image: village1,
        villageId: "v1",
        villageName: "Kumbalgarh Heritage",
      },
    ],
    stays: [
      { id: "s1", title: "Traditional Haveli Room", price: 35, image: village1 },
    ],
    fundContribution: 2450,
    fundProject: "Community Water Purification System",
    fundProgress: 68,
  },
  {
    id: "v2",
    name: "Wayanad Green Village",
    region: "Kerala, India",
    rating: 4.9,
    reviews: 89,
    verified: true,
    image: village2,
    startingPrice: 55,
    description: "A lush green village in the Western Ghats offering spice garden tours, bamboo rafting, and authentic Kerala cuisine cooked in traditional clay pots.",
    highlights: ["Spice Garden Tour", "Bamboo Rafting", "Ayurveda Wellness"],
    experiences: [
      {
        id: "e2",
        title: "Spice Garden Walk & Cooking Class",
        description: "Harvest spices from the garden and cook a traditional Kerala Sadya meal with a village grandmother.",
        price: 55,
        duration: "5 hours",
        included: ["Spice garden tour", "Cooking class", "Full meal", "Spice packet to take home"],
        safety: ["Flat terrain", "Shaded paths", "Drinking water provided"],
        image: village2,
        villageId: "v2",
        villageName: "Wayanad Green Village",
      },
    ],
    stays: [
      { id: "s2", title: "Treehouse Stay", price: 60, image: village2 },
    ],
    fundContribution: 3200,
    fundProject: "Village School Library",
    fundProgress: 82,
  },
  {
    id: "v3",
    name: "Dzükou Valley Hamlet",
    region: "Nagaland, India",
    rating: 4.7,
    reviews: 45,
    verified: true,
    image: village3,
    startingPrice: 65,
    description: "A remote Naga hamlet surrounded by the legendary Dzükou lily valley. Experience warrior dances, bamboo crafts, and hearty Naga cuisine.",
    highlights: ["Valley Trek", "Warrior Dance", "Bamboo Crafts"],
    experiences: [
      {
        id: "e3",
        title: "Dzükou Valley Day Trek",
        description: "Trek through the stunning Dzükou Valley with a Naga guide. See rare lilies, mountain streams, and panoramic views.",
        price: 65,
        duration: "6 hours",
        included: ["Trek guide", "Packed lunch", "Rain gear", "First aid"],
        safety: ["Experienced guide", "Satellite phone", "Weather monitoring"],
        image: village3,
        villageId: "v3",
        villageName: "Dzükou Valley Hamlet",
      },
    ],
    stays: [
      { id: "s3", title: "Traditional Morung Stay", price: 40, image: village3 },
    ],
    fundContribution: 1800,
    fundProject: "Solar Panel Installation",
    fundProgress: 45,
  },
];

export const dishes: Dish[] = [
  {
    id: "d1",
    name: "Laal Maas",
    villageName: "Kumbalgarh Heritage",
    villageId: "v1",
    image: dish1,
    spiceLevel: 3,
    vegetarian: false,
    seasonal: false,
    story: "A fiery Rajasthani mutton curry passed down through generations of Rajput warriors. Slow-cooked with mathania chilies and yogurt over a wood fire.",
    ingredients: ["Mathania Red Chili", "Village Yogurt", "Local Mutton", "Mustard Oil", "Garlic"],
    cookingClassPrice: 35,
  },
  {
    id: "d2",
    name: "Kerala Sadya Thali",
    villageName: "Wayanad Green Village",
    villageId: "v2",
    image: dish2,
    spiceLevel: 2,
    vegetarian: true,
    seasonal: true,
    story: "A festive vegetarian feast served on a banana leaf with 12+ dishes. Each element represents a season's harvest from the village gardens.",
    ingredients: ["Banana Leaf", "Coconut", "Jackfruit", "Tamarind", "Curry Leaves"],
    cookingClassPrice: 40,
  },
  {
    id: "d3",
    name: "Naga Bamboo Momos",
    villageName: "Dzükou Valley Hamlet",
    villageId: "v3",
    image: dish3,
    spiceLevel: 2,
    vegetarian: false,
    seasonal: false,
    story: "Steamed dumplings wrapped in bamboo leaves, filled with local herbs and smoked pork. A Naga festive delicacy prepared during harvest celebrations.",
    ingredients: ["Bamboo Leaves", "Smoked Pork", "Raja Mircha", "Wild Herbs", "Rice Flour"],
    cookingClassPrice: 30,
  },
];

export const bookings: Booking[] = [
  {
    id: "b1",
    villageName: "Wayanad Green Village",
    experienceTitle: "Spice Garden Walk & Cooking Class",
    date: "2026-03-15",
    status: "upcoming",
    price: 55,
    image: village2,
  },
  {
    id: "b2",
    villageName: "Kumbalgarh Heritage",
    experienceTitle: "Heritage Fort Trail & Village Walk",
    date: "2026-01-20",
    status: "completed",
    price: 45,
    image: village1,
  },
];
