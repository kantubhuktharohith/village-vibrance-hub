import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Leaf, Star, UtensilsCrossed } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import ReviewSection from "@/components/ReviewSection";
import { Badge } from "@/components/ui/badge";

interface PlaceFood {
  id: string;
  name: string;
  description: string;
  image_url: string | null;
  price_range: string;
  cuisine_type: string;
  is_vegetarian: boolean;
  rating: number;
}

const PlaceFoodsPage = () => {
  const { placeId } = useParams();
  const navigate = useNavigate();
  const [foods, setFoods] = useState<PlaceFood[]>([]);
  const [placeName, setPlaceName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [foodsRes, placeRes] = await Promise.all([
        supabase.from("place_foods").select("*").eq("place_id", placeId),
        supabase.from("tourist_places").select("name").eq("id", placeId).single(),
      ]);
      if (foodsRes.data) setFoods(foodsRes.data as PlaceFood[]);
      if (placeRes.data) setPlaceName(placeRes.data.name);
      setLoading(false);
    };
    if (placeId) fetchData();
  }, [placeId]);

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="flex items-center gap-3 px-5 py-4">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center">
            <ArrowLeft className="w-4.5 h-4.5" />
          </button>
          <div>
            <h1 className="font-display text-xl font-bold">Famous Foods</h1>
            <p className="text-xs text-muted-foreground">{placeName}</p>
          </div>
        </div>
      </div>

      <div className="px-5 py-4">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : foods.length === 0 ? (
          <div className="text-center py-12">
            <UtensilsCrossed className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No food items listed yet for this place.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {foods.map((food, i) => (
              <motion.div
                key={food.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm"
              >
                {food.image_url && (
                  <img src={food.image_url} alt={food.name} className="w-full h-40 object-cover" />
                )}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-display font-semibold text-base">{food.name}</h3>
                      {food.cuisine_type && (
                        <p className="text-xs text-muted-foreground">{food.cuisine_type}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {food.is_vegetarian && (
                        <Badge variant="outline" className="gap-1 text-primary border-primary">
                          <Leaf className="w-3 h-3" /> Veg
                        </Badge>
                      )}
                      {food.rating > 0 && (
                        <div className="flex items-center gap-1 text-accent">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span className="text-xs font-semibold">{food.rating}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  {food.description && (
                    <p className="text-sm text-muted-foreground mb-2">{food.description}</p>
                  )}
                  {food.price_range && (
                    <p className="text-sm font-semibold text-foreground">₹{food.price_range}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Reviews for each food item */}
          {foods.map((food) => (
            <div key={`review-${food.id}`} className="mt-6">
              <ReviewSection targetId={food.id} reviewType="food" title={`Reviews for ${food.name}`} />
            </div>
          ))}
        )}
      </div>
    </div>
  );
};

export default PlaceFoodsPage;
