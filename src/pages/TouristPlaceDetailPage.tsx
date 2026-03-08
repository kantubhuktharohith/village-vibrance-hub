import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, Heart, MapPin, Star, UtensilsCrossed, BedDouble, Calculator, Check, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

interface TouristPlace {
  id: string;
  name: string;
  region: string;
  description: string;
  image_url: string | null;
  lat: number;
  lng: number;
  starting_price: number;
  highlights: string[] | null;
  verified: boolean;
}

const TouristPlaceDetailPage = () => {
  const { placeId } = useParams();
  const navigate = useNavigate();
  const [place, setPlace] = useState<TouristPlace | null>(null);
  const [loading, setLoading] = useState(true);
  const [foodCount, setFoodCount] = useState(0);
  const [roomCount, setRoomCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const [placeRes, foodRes, roomRes] = await Promise.all([
        supabase.from("tourist_places").select("*").eq("id", placeId).single(),
        supabase.from("place_foods").select("id", { count: "exact", head: true }).eq("place_id", placeId),
        supabase.from("place_rooms").select("id", { count: "exact", head: true }).eq("place_id", placeId),
      ]);
      if (placeRes.data) setPlace(placeRes.data as TouristPlace);
      setFoodCount(foodRes.count || 0);
      setRoomCount(roomRes.count || 0);
      setLoading(false);
    };
    if (placeId) fetchData();
  }, [placeId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!place) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6 text-center">
        <MapPin className="w-12 h-12 text-muted-foreground mb-3" />
        <p className="text-muted-foreground">Place not found.</p>
      </div>
    );
  }

  const quickLinks = [
    { icon: UtensilsCrossed, label: "Famous Food", count: foodCount, path: `/place/${placeId}/foods`, color: "text-accent", bg: "bg-accent/10" },
    { icon: BedDouble, label: "Accommodation", count: roomCount, path: `/place/${placeId}/rooms`, color: "text-primary", bg: "bg-primary/10" },
    { icon: Calculator, label: "Budget Planner", count: null, path: `/place/${placeId}/budget`, color: "text-impact", bg: "bg-impact/10" },
  ];

  return (
    <div className="pb-24 min-h-screen bg-background">
      {/* Hero */}
      <div className="relative">
        {place.image_url ? (
          <img src={place.image_url} alt={place.name} className="w-full h-72 object-cover" />
        ) : (
          <div className="w-full h-72 bg-secondary flex items-center justify-center">
            <MapPin className="w-16 h-16 text-muted-foreground" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button className="absolute top-4 right-4 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground">
          <Heart className="w-4 h-4" />
        </button>
        {place.verified && (
          <div className="absolute bottom-4 left-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/90 text-primary-foreground text-xs font-semibold backdrop-blur-sm">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified Destination
            </span>
          </div>
        )}
        {place.starting_price > 0 && (
          <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm rounded-lg px-2.5 py-1 text-sm font-semibold">
            From ₹{place.starting_price}
          </div>
        )}
      </div>

      <div className="px-5 pt-5">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* Title */}
          <div>
            <h1 className="font-display text-2xl font-bold">{place.name}</h1>
            <div className="flex items-center gap-2 mt-1.5 text-muted-foreground text-sm">
              <MapPin className="w-3.5 h-3.5" />
              {place.region}
            </div>
          </div>

          {/* Quick navigation links */}
          <div className="grid grid-cols-3 gap-3">
            {quickLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => navigate(link.path)}
                className="rounded-2xl border border-border bg-card p-4 text-center transition-all hover:shadow-md active:scale-[0.97]"
              >
                <div className={`w-10 h-10 rounded-xl ${link.bg} flex items-center justify-center mx-auto mb-2`}>
                  <link.icon className={`w-5 h-5 ${link.color}`} />
                </div>
                <p className="text-xs font-semibold">{link.label}</p>
                {link.count !== null && (
                  <p className="text-[10px] text-muted-foreground mt-0.5">{link.count} listed</p>
                )}
              </button>
            ))}
          </div>

          {/* Description */}
          {place.description && (
            <section>
              <h2 className="font-display text-lg font-semibold mb-2">About</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{place.description}</p>
            </section>
          )}

          {/* Highlights */}
          {place.highlights && place.highlights.length > 0 && (
            <section>
              <h2 className="font-display text-lg font-semibold mb-2">Highlights</h2>
              <div className="flex flex-wrap gap-2">
                {place.highlights.map((h) => (
                  <span key={h} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-secondary text-xs font-medium text-secondary-foreground">
                    <Check className="w-3 h-3" /> {h}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Location */}
          {(place.lat !== 0 || place.lng !== 0) && (
            <section>
              <h2 className="font-display text-lg font-semibold mb-2">Location</h2>
              <div className="rounded-2xl border border-border bg-card p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{place.region}</p>
                  <p className="text-xs text-muted-foreground">{place.lat.toFixed(4)}°N, {place.lng.toFixed(4)}°E</p>
                </div>
              </div>
            </section>
          )}
        </motion.div>
      </div>

      {/* Sticky bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-md border-t border-border z-30">
        <div className="flex gap-3">
          <button
            onClick={() => navigate(`/place/${placeId}/rooms`)}
            className="flex-1 py-3.5 rounded-2xl bg-primary text-primary-foreground font-semibold transition-all hover:opacity-90 active:scale-[0.98]"
          >
            Book Stay — From ₹{place.starting_price}
          </button>
          <button
            onClick={() => navigate(`/place/${placeId}/budget`)}
            className="w-14 rounded-2xl border border-border bg-card flex items-center justify-center transition-all hover:bg-secondary"
          >
            <Calculator className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TouristPlaceDetailPage;
