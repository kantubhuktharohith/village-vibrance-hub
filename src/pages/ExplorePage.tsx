import { useState, useEffect } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import VillageCard from "@/components/VillageCard";
import TouristPlaceCard from "@/components/TouristPlaceCard";
import VillageMap from "@/components/VillageMap";
import { villages } from "@/data/mockData";
import { supabase } from "@/integrations/supabase/client";

interface TouristPlace {
  id: string;
  name: string;
  region: string;
  image_url: string | null;
  starting_price: number;
  verified: boolean;
}

const ExplorePage = () => {
  const [search, setSearch] = useState("");
  const [dbPlaces, setDbPlaces] = useState<TouristPlace[]>([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      const { data } = await supabase
        .from("tourist_places")
        .select("id, name, region, image_url, starting_price, verified")
        .eq("verified", true)
        .order("created_at", { ascending: false });
      if (data) setDbPlaces(data as TouristPlace[]);
    };
    fetchPlaces();
  }, []);

  const filteredVillages = villages.filter(
    (v) =>
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.region.toLowerCase().includes(search.toLowerCase())
  );

  const filteredPlaces = dbPlaces.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.region.toLowerCase().includes(search.toLowerCase())
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

      <VillageMap />

      {/* Verified Tourist Places from DB */}
      {filteredPlaces.length > 0 && (
        <>
          <h2 className="font-display text-xl font-bold mb-4">Tourist Destinations</h2>
          <div className="space-y-4 mb-8">
            {filteredPlaces.map((place, i) => (
              <motion.div
                key={place.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <TouristPlaceCard place={place} />
              </motion.div>
            ))}
          </div>
        </>
      )}

      <h2 className="font-display text-xl font-bold mb-4">Discover Villages</h2>

      <div className="space-y-4">
        {filteredVillages.map((village, i) => (
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
