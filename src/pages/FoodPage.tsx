import { useState } from "react";
import { Search, Flame, Leaf, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { dishes } from "@/data/mockData";

const filters = [
  { id: "all", label: "All", icon: null },
  { id: "spicy", label: "Spicy", icon: Flame },
  { id: "veg", label: "Vegetarian", icon: Leaf },
  { id: "seasonal", label: "Seasonal", icon: Sun },
];

const FoodPage = () => {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const navigate = useNavigate();

  const filtered = dishes.filter((d) => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.villageName.toLowerCase().includes(search.toLowerCase());
    if (activeFilter === "spicy") return matchSearch && d.spiceLevel >= 3;
    if (activeFilter === "veg") return matchSearch && d.vegetarian;
    if (activeFilter === "seasonal") return matchSearch && d.seasonal;
    return matchSearch;
  });

  return (
    <div className="px-5 py-4">
      <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-secondary border border-border mb-4">
        <Search className="w-4 h-4 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search dishes..."
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>

      <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeFilter === f.id
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            }`}
          >
            {f.icon && <f.icon className="w-3.5 h-3.5" />}
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {filtered.map((dish, i) => (
          <motion.button
            key={dish.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => navigate(`/dish/${dish.id}`)}
            className="glass-card overflow-hidden text-left transition-all hover:shadow-md active:scale-[0.98]"
          >
            <img src={dish.image} alt={dish.name} className="w-full h-32 object-cover" loading="lazy" />
            <div className="p-3">
              <h3 className="font-semibold text-sm">{dish.name}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{dish.villageName}</p>
              <div className="flex items-center gap-1 mt-2">
                {Array.from({ length: dish.spiceLevel }).map((_, j) => (
                  <Flame key={j} className="w-3 h-3 text-accent" />
                ))}
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default FoodPage;
