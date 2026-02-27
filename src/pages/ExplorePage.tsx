import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import VillageCard from "@/components/VillageCard";
import { villages } from "@/data/mockData";

const ExplorePage = () => {
  const [search, setSearch] = useState("");

  const filtered = villages.filter(
    (v) =>
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.region.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="px-5 py-4">
      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-xl bg-secondary border border-border">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search villages, regions..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <button className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors">
          <SlidersHorizontal className="w-4.5 h-4.5" />
        </button>
      </div>

      {/* Map placeholder */}
      <div className="relative rounded-2xl overflow-hidden mb-5 h-48 bg-muted">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
          <div className="text-center">
            <p className="text-sm font-semibold text-muted-foreground">🗺️ Interactive Map</p>
            <p className="text-xs text-muted-foreground mt-1">Village locations coming soon</p>
          </div>
        </div>
        {/* Trust indicator */}
        <div className="absolute top-3 left-3 trust-badge-solid">
          <span>All villages verified ✓</span>
        </div>
      </div>

      <h2 className="font-display text-xl font-bold mb-4">Discover Villages</h2>

      <div className="space-y-4">
        {filtered.map((village, i) => (
          <motion.div
            key={village.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <VillageCard village={village} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ExplorePage;
