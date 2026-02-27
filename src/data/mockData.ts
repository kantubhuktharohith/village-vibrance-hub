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
  {
    id: "v4",
    name: "Hampi Heritage Village",
    region: "Karnataka, India",
    rating: 4.9,
    reviews: 210,
    verified: true,
    image: village1,
    startingPrice: 40,
    description: "Live among the ancient ruins of the Vijayanagara Empire. Explore boulder-strewn landscapes, coracle rides on the Tungabhadra, and sunset temple visits with local storytellers.",
    highlights: ["Temple Ruins Walk", "Coracle Ride", "Boulder Climbing"],
    experiences: [
      {
        id: "e4",
        title: "Sunrise Temple Trail & Coracle Ride",
        description: "Watch sunrise from Matanga Hill, explore Hampi's iconic ruins with a local historian, then drift across the Tungabhadra River in a traditional coracle.",
        price: 40,
        duration: "5 hours",
        included: ["Local historian guide", "Coracle ride", "Traditional breakfast", "Temple entry"],
        safety: ["Life jackets provided", "Shaded rest stops", "First aid kit"],
        image: village1,
        villageId: "v4",
        villageName: "Hampi Heritage Village",
      },
      {
        id: "e4b",
        title: "Boulder Sunset & Village Feast",
        description: "Climb boulders with a trained guide for panoramic sunset views, then join a village family for an authentic Karnataka feast cooked on wood fire.",
        price: 50,
        duration: "4 hours",
        included: ["Climbing guide", "Safety gear", "Full dinner", "Bonfire"],
        safety: ["Certified climbing instructor", "Helmets & harnesses", "Emergency contact"],
        image: village2,
        villageId: "v4",
        villageName: "Hampi Heritage Village",
      },
    ],
    stays: [
      { id: "s4", title: "Riverside Stone Cottage", price: 30, image: village1 },
    ],
    fundContribution: 4100,
    fundProject: "Heritage Restoration & Tourist Facilities",
    fundProgress: 72,
  },
  {
    id: "v5",
    name: "Spiti Valley Homestay",
    region: "Himachal Pradesh, India",
    rating: 4.8,
    reviews: 98,
    verified: true,
    image: village3,
    startingPrice: 55,
    description: "A high-altitude desert village at 12,500 ft with ancient Buddhist monasteries, yak herding trails, and the clearest night skies in India. Disconnect completely.",
    highlights: ["Monastery Visit", "Yak Trail", "Astrophotography"],
    experiences: [
      {
        id: "e5",
        title: "Monastery & Yak Herder Trek",
        description: "Visit the 1000-year-old Key Monastery, then trek with local yak herders through high-altitude meadows. Experience Buddhist chanting and butter tea.",
        price: 55,
        duration: "7 hours",
        included: ["Monastery guide", "Yak trek", "Butter tea & lunch", "Prayer flags"],
        safety: ["Altitude acclimatization briefing", "Oxygen cylinder available", "Experienced mountain guide"],
        image: village3,
        villageId: "v5",
        villageName: "Spiti Valley Homestay",
      },
      {
        id: "e5b",
        title: "Stargazing & Night Sky Photography",
        description: "Guided astrophotography session under one of the clearest skies on Earth. Learn to capture the Milky Way with a professional photographer from the village.",
        price: 45,
        duration: "3 hours",
        included: ["Photography guide", "Hot chocolate & snacks", "Blankets", "Tripod rental"],
        safety: ["Warm gear provided", "Heated basecamp nearby", "First aid"],
        image: village2,
        villageId: "v5",
        villageName: "Spiti Valley Homestay",
      },
    ],
    stays: [
      { id: "s5", title: "Traditional Mud-Brick Room", price: 25, image: village3 },
    ],
    fundContribution: 2900,
    fundProject: "Solar-Heated Community Center",
    fundProgress: 55,
  },
  {
    id: "v6",
    name: "Majuli Island Village",
    region: "Assam, India",
    rating: 4.6,
    reviews: 67,
    verified: true,
    image: village2,
    startingPrice: 35,
    description: "The world's largest river island on the Brahmaputra. Experience Vaishnavite Sattra culture, mask-making workshops, and boat rides through wetlands teeming with migratory birds.",
    highlights: ["Mask Making", "Sattra Dance", "Wetland Boat Safari"],
    experiences: [
      {
        id: "e6",
        title: "Mask Making & Sattra Cultural Immersion",
        description: "Learn the ancient art of mask-making from Sattra monks, watch a traditional Bhaona dance performance, and explore the island by bicycle.",
        price: 35,
        duration: "5 hours",
        included: ["Mask-making materials", "Cultural performance", "Bicycle rental", "Assamese lunch"],
        safety: ["Flat terrain", "Life jackets for ferry", "Local emergency contacts"],
        image: village2,
        villageId: "v6",
        villageName: "Majuli Island Village",
      },
    ],
    stays: [
      { id: "s6", title: "Bamboo Chang Ghar", price: 20, image: village2 },
    ],
    fundContribution: 1500,
    fundProject: "Flood Protection & Erosion Control",
    fundProgress: 38,
  },
  {
    id: "v7",
    name: "Rann of Kutch Camp",
    region: "Gujarat, India",
    rating: 4.7,
    reviews: 156,
    verified: true,
    image: village1,
    startingPrice: 50,
    description: "Camp at the edge of the white salt desert under infinite skies. Experience Kutchi embroidery, camel safaris across the salt flats, and folk music under a full moon.",
    highlights: ["Salt Desert Safari", "Embroidery Workshop", "Full Moon Night"],
    experiences: [
      {
        id: "e7",
        title: "White Desert Camel Safari & Sunset",
        description: "Ride camels across the surreal white salt flats as the sun sets, painting the desert in shades of gold and pink. Return to camp for folk music and dinner.",
        price: 50,
        duration: "4 hours",
        included: ["Camel ride", "Folk music performance", "Kutchi dinner", "Chai"],
        safety: ["Experienced camel handlers", "GPS tracking", "Water & first aid"],
        image: village1,
        villageId: "v7",
        villageName: "Rann of Kutch Camp",
      },
      {
        id: "e7b",
        title: "Kutchi Embroidery & Mirror Work Class",
        description: "Learn the globally renowned Kutchi embroidery and mirror work from master artisan women. Create your own piece to take home.",
        price: 30,
        duration: "3 hours",
        included: ["All materials", "Tea & snacks", "Finished piece to keep", "Artisan certificate"],
        safety: ["Indoor workshop", "Comfortable seating", "Drinking water"],
        image: village3,
        villageId: "v7",
        villageName: "Rann of Kutch Camp",
      },
    ],
    stays: [
      { id: "s7", title: "Luxury Desert Bhunga", price: 45, image: village1 },
    ],
    fundContribution: 3600,
    fundProject: "Artisan Women's Cooperative & Training Center",
    fundProgress: 61,
  },
  {
    id: "v8",
    name: "Coorg Coffee Estate",
    region: "Karnataka, India",
    rating: 4.8,
    reviews: 134,
    verified: true,
    image: village2,
    startingPrice: 50,
    description: "Wake up to mist-covered coffee plantations in the Scotland of India. Learn bean-to-cup coffee making, trek to Abbey Falls, and taste Kodava warrior cuisine.",
    highlights: ["Coffee Trail", "Waterfall Trek", "Kodava Cuisine"],
    experiences: [
      {
        id: "e8",
        title: "Bean-to-Cup Coffee Experience",
        description: "Walk through arabica plantations, pick ripe coffee cherries, roast and brew your own cup. Includes a masterclass on single-origin coffee tasting.",
        price: 50,
        duration: "4 hours",
        included: ["Plantation walk", "Roasting session", "Coffee tasting", "250g fresh beans to take home"],
        safety: ["Shaded paths", "Insect repellent provided", "First aid"],
        image: village2,
        villageId: "v8",
        villageName: "Coorg Coffee Estate",
      },
    ],
    stays: [
      { id: "s8", title: "Plantation Cottage", price: 55, image: village2 },
    ],
    fundContribution: 2800,
    fundProject: "Sustainable Farming & Worker Housing",
    fundProgress: 49,
  },
  {
    id: "v9",
    name: "Ziro Valley Apatani",
    region: "Arunachal Pradesh, India",
    rating: 4.9,
    reviews: 38,
    verified: true,
    image: village3,
    startingPrice: 60,
    description: "A hidden UNESCO-nominated valley where the Apatani tribe practices sustainable rice-fish farming unchanged for centuries. No crowds, no commercialization — pure cultural immersion.",
    highlights: ["Rice-Fish Farming", "Tribal Tattoo Culture", "Pine Forest Hike"],
    experiences: [
      {
        id: "e9",
        title: "Apatani Village Walk & Rice-Fish Farm",
        description: "Walk through stilted bamboo villages, learn the ancient rice-fish polyculture technique, and share a meal with an Apatani elder. Witness nose plugs and facial tattoo traditions of the last generation.",
        price: 60,
        duration: "5 hours",
        included: ["Tribal guide", "Farm visit", "Traditional lunch", "Bamboo craft demo"],
        safety: ["Permit arranged", "Local emergency contact", "Flat terrain walk"],
        image: village3,
        villageId: "v9",
        villageName: "Ziro Valley Apatani",
      },
    ],
    stays: [
      { id: "s9", title: "Bamboo Homestay", price: 25, image: village3 },
    ],
    fundContribution: 900,
    fundProject: "Cultural Heritage Documentation Center",
    fundProgress: 22,
  },
  {
    id: "v10",
    name: "Mawlynnong Living Root",
    region: "Meghalaya, India",
    rating: 4.8,
    reviews: 72,
    verified: true,
    image: village2,
    startingPrice: 40,
    description: "Asia's cleanest village, hidden in Meghalaya's cloud forests. Walk across living root bridges grown over 500 years, swim in crystal-clear natural pools, and sleep to the sound of rain.",
    highlights: ["Living Root Bridge", "Natural Rock Pools", "Cleanest Village Tour"],
    experiences: [
      {
        id: "e10",
        title: "Double-Decker Root Bridge Trek",
        description: "Descend 3,500 steps through dense jungle to reach the iconic double-decker living root bridge — a natural wonder grown by Khasi tribes over five centuries.",
        price: 40,
        duration: "6 hours",
        included: ["Khasi guide", "Packed lunch", "Swimming stop", "Bamboo walking stick"],
        safety: ["Sturdy steps with railings", "Guide carries first aid", "Weather check before descent"],
        image: village2,
        villageId: "v10",
        villageName: "Mawlynnong Living Root",
      },
    ],
    stays: [
      { id: "s10", title: "Treehouse Above the Clouds", price: 35, image: village2 },
    ],
    fundContribution: 2100,
    fundProject: "Root Bridge Conservation & Trail Safety",
    fundProgress: 58,
  },
  {
    id: "v11",
    name: "Dhanushkodi Ghost Town",
    region: "Tamil Nadu, India",
    rating: 4.6,
    reviews: 53,
    verified: true,
    image: village1,
    startingPrice: 35,
    description: "A hauntingly beautiful ghost town at India's southeastern tip, destroyed by a 1964 cyclone. Walk through ruins where the Indian Ocean meets the Bay of Bengal, with Sri Lanka visible on clear days.",
    highlights: ["Ghost Town Walk", "Two-Ocean Confluence", "Fishermen Stories"],
    experiences: [
      {
        id: "e11",
        title: "Ghost Town & Ocean Confluence Journey",
        description: "Drive across a sand road surrounded by sea on both sides to reach the abandoned town. Hear cyclone survivor stories from local fishermen and stand where two oceans merge.",
        price: 35,
        duration: "4 hours",
        included: ["4x4 transport", "Fisherman guide", "Fresh seafood lunch", "Coconut water"],
        safety: ["Life jackets available", "Tide-checked schedule", "Vehicle GPS tracked"],
        image: village1,
        villageId: "v11",
        villageName: "Dhanushkodi Ghost Town",
      },
    ],
    stays: [
      { id: "s11", title: "Beachside Fisher Hut", price: 20, image: village1 },
    ],
    fundContribution: 1200,
    fundProject: "Fishermen Community Cyclone Shelter",
    fundProgress: 33,
  },
  {
    id: "v12",
    name: "Gurez Valley Hamlet",
    region: "Kashmir, India",
    rating: 4.9,
    reviews: 29,
    verified: true,
    image: village3,
    startingPrice: 70,
    description: "One of India's most remote inhabited valleys, cut off by snow for 6 months. Untouched alpine meadows, Dard-Shin tribal culture, and the turquoise Kishanganga river — no tourists, no hotels, just raw beauty.",
    highlights: ["Alpine Meadow Walk", "Dard-Shin Culture", "River Fishing"],
    experiences: [
      {
        id: "e12",
        title: "Gurez Alpine Meadow & Tribal Immersion",
        description: "Trek through wildflower meadows to a Dard-Shin shepherd camp. Learn ancient pastoral traditions, try river trout fishing, and sleep under stars at 8,000 ft.",
        price: 70,
        duration: "Full day",
        included: ["Military permit assistance", "Tribal guide", "All meals", "Camping gear"],
        safety: ["Satellite phone", "Army post nearby", "Weather monitoring", "Altitude briefing"],
        image: village3,
        villageId: "v12",
        villageName: "Gurez Valley Hamlet",
      },
    ],
    stays: [
      { id: "s12", title: "Log Cabin by Kishanganga", price: 40, image: village3 },
    ],
    fundContribution: 600,
    fundProject: "Winter Road & Medical Access Fund",
    fundProgress: 15,
  },
  {
    id: "v13",
    name: "Lepchajagat Forest Village",
    region: "West Bengal, India",
    rating: 4.7,
    reviews: 41,
    verified: true,
    image: village2,
    startingPrice: 30,
    description: "A fog-wrapped hamlet hidden in ancient oak and magnolia forests near Darjeeling. No shops, no Wi-Fi — just birdsong, mountain views, and the silence of the eastern Himalayas.",
    highlights: ["Silent Forest Walk", "Rare Bird Spotting", "Himalayan Sunrise"],
    experiences: [
      {
        id: "e13",
        title: "Dawn Birding & Forest Bathing",
        description: "Join a Lepcha naturalist at dawn to spot rare Himalayan birds including the Fire-tailed Sunbird. Practice Japanese-inspired forest bathing among century-old oaks and rhododendrons.",
        price: 30,
        duration: "4 hours",
        included: ["Lepcha naturalist guide", "Binoculars", "Herbal tea & breakfast", "Bird checklist"],
        safety: ["Easy trails", "Leech socks provided", "Rain ponchos available"],
        image: village2,
        villageId: "v13",
        villageName: "Lepchajagat Forest Village",
      },
    ],
    stays: [
      { id: "s13", title: "Forest View Wooden Lodge", price: 28, image: village2 },
    ],
    fundContribution: 1400,
    fundProject: "Reforestation & Eco-Trail Development",
    fundProgress: 42,
  },
  {
    id: "v14",
    name: "Sandakphu Sherpa Settlement",
    region: "West Bengal-Nepal Border, India",
    rating: 4.8,
    reviews: 64,
    verified: true,
    image: village1,
    startingPrice: 75,
    description: "The highest point in West Bengal where you can see four of the world's five tallest peaks — Everest, Kangchenjunga, Lhotse, and Makalu — from a single viewpoint. A tiny Sherpa settlement serves yak cheese and thukpa.",
    highlights: ["Four-Peak Sunrise", "Sherpa Culture", "High-Altitude Camping"],
    experiences: [
      {
        id: "e14",
        title: "Sleeping Giant Sunrise & Sherpa Feast",
        description: "Wake at 4 AM for the legendary 'Sleeping Buddha' sunrise view across four 8,000m peaks. Return to the settlement for a Sherpa-cooked feast with yak butter tea and momos.",
        price: 75,
        duration: "Full day",
        included: ["Mountain guide", "All meals", "Warm gear rental", "Hot water bottles"],
        safety: ["Altitude medicine available", "Experienced high-altitude guide", "Emergency evacuation plan"],
        image: village1,
        villageId: "v14",
        villageName: "Sandakphu Sherpa Settlement",
      },
    ],
    stays: [
      { id: "s14", title: "Mountain Hut at 11,900ft", price: 35, image: village1 },
    ],
    fundContribution: 1800,
    fundProject: "Trail Restoration & Waste Management",
    fundProgress: 47,
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
  {
    id: "d4",
    name: "Bisi Bele Bath",
    villageName: "Hampi Heritage Village",
    villageId: "v4",
    image: dish1,
    spiceLevel: 2,
    vegetarian: true,
    seasonal: false,
    story: "A hearty Karnataka rice-lentil dish seasoned with a secret spice powder unique to each village family. Cooked in brass vessels over wood fire near the ancient ruins.",
    ingredients: ["Toor Dal", "Rice", "Bisi Bele Powder", "Tamarind", "Ghee"],
    cookingClassPrice: 25,
  },
  {
    id: "d5",
    name: "Thukpa & Butter Tea",
    villageName: "Spiti Valley Homestay",
    villageId: "v5",
    image: dish2,
    spiceLevel: 1,
    vegetarian: false,
    seasonal: true,
    story: "A warming Tibetan noodle soup perfected by Spiti grandmothers over centuries. Paired with salted yak butter tea — the ultimate high-altitude comfort meal.",
    ingredients: ["Hand-pulled Noodles", "Yak Meat", "Mountain Herbs", "Yak Butter", "Brick Tea"],
    cookingClassPrice: 30,
  },
  {
    id: "d6",
    name: "Poitabhat & Duck Curry",
    villageName: "Majuli Island Village",
    villageId: "v6",
    image: dish3,
    spiceLevel: 2,
    vegetarian: false,
    seasonal: false,
    story: "Fermented rice soaked overnight served with spicy Assamese duck curry. A Majuli island specialty using free-range ducks and wild herbs from the Brahmaputra wetlands.",
    ingredients: ["Fermented Rice", "Free-range Duck", "Bamboo Shoot", "Bhut Jolokia", "Mustard Oil"],
    cookingClassPrice: 35,
  },
  {
    id: "d7",
    name: "Dabeli & Kutchi Chai",
    villageName: "Rann of Kutch Camp",
    villageId: "v7",
    image: dish1,
    spiceLevel: 2,
    vegetarian: true,
    seasonal: false,
    story: "A spiced potato-filled bun topped with pomegranate and sev, born in the streets of Kutch. Paired with masala chai brewed with desert herbs by nomadic communities.",
    ingredients: ["Pav Bun", "Spiced Potato", "Pomegranate", "Tamarind Chutney", "Desert Herbs"],
    cookingClassPrice: 20,
  },
  {
    id: "d8",
    name: "Pandi Curry & Akki Roti",
    villageName: "Coorg Coffee Estate",
    villageId: "v8",
    image: dish2,
    spiceLevel: 3,
    vegetarian: false,
    seasonal: false,
    story: "The iconic Kodava pork curry slow-cooked with kachampuli vinegar, served with crispy rice flatbread. A warrior clan's celebratory feast now shared with travelers.",
    ingredients: ["Heritage Pork", "Kachampuli Vinegar", "Coorg Pepper", "Rice Flour", "Coconut"],
    cookingClassPrice: 40,
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
