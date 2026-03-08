import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, BedDouble, Star, Users, Wifi, Check } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import ReviewSection from "@/components/ReviewSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PlaceRoom {
  id: string;
  name: string;
  description: string;
  image_url: string | null;
  room_type: string;
  price_per_night: number;
  max_guests: number;
  amenities: string[];
  rating: number;
  total_reviews: number;
  available: boolean;
}

const PlaceRoomsPage = () => {
  const { placeId } = useParams();
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<PlaceRoom[]>([]);
  const [placeName, setPlaceName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [roomsRes, placeRes] = await Promise.all([
        supabase.from("place_rooms").select("*").eq("place_id", placeId),
        supabase.from("tourist_places").select("name").eq("id", placeId).single(),
      ]);
      if (roomsRes.data) setRooms(roomsRes.data as PlaceRoom[]);
      if (placeRes.data) setPlaceName(placeRes.data.name);
      setLoading(false);
    };
    if (placeId) fetchData();
  }, [placeId]);

  const typeLabel = (type: string) => {
    const map: Record<string, string> = {
      standard: "Standard", deluxe: "Deluxe", suite: "Suite",
      dormitory: "Dormitory", cottage: "Cottage", homestay: "Homestay",
    };
    return map[type] || type;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="flex items-center gap-3 px-5 py-4">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center">
            <ArrowLeft className="w-4.5 h-4.5" />
          </button>
          <div>
            <h1 className="font-display text-xl font-bold">Accommodation</h1>
            <p className="text-xs text-muted-foreground">{placeName}</p>
          </div>
        </div>
      </div>

      <div className="px-5 py-4">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : rooms.length === 0 ? (
          <div className="text-center py-12">
            <BedDouble className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No rooms listed yet for this place.</p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {rooms.map((room, i) => (
                <motion.div
                  key={room.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm"
                >
                  {room.image_url && (
                    <div className="relative">
                      <img src={room.image_url} alt={room.name} className="w-full h-44 object-cover" />
                      {!room.available && (
                        <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center">
                          <span className="text-background font-semibold text-sm">Fully Booked</span>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-display font-semibold text-base">{room.name}</h3>
                        <Badge variant="secondary" className="mt-1 text-[10px]">{typeLabel(room.room_type)}</Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-foreground">₹{room.price_per_night}</p>
                        <p className="text-[10px] text-muted-foreground">per night</p>
                      </div>
                    </div>

                    {room.description && (
                      <p className="text-sm text-muted-foreground mb-3">{room.description}</p>
                    )}

                    <div className="flex items-center gap-4 mb-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" /> {room.max_guests} guests
                      </span>
                      {room.rating > 0 && (
                        <span className="flex items-center gap-1 text-accent">
                          <Star className="w-3.5 h-3.5 fill-current" /> {room.rating}
                          {room.total_reviews > 0 && <span>({room.total_reviews})</span>}
                        </span>
                      )}
                    </div>

                    {room.amenities.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {room.amenities.slice(0, 5).map((a) => (
                          <span key={a} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary text-[10px] text-secondary-foreground">
                            <Check className="w-2.5 h-2.5" /> {a}
                          </span>
                        ))}
                      </div>
                    )}

                    <Button size="sm" className="w-full" disabled={!room.available}>
                      {room.available ? "Book Now" : "Unavailable"}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>

            {rooms.map((room) => (
              <div key={`review-${room.id}`} className="mt-6">
                <ReviewSection targetId={room.id} reviewType="room" title={`Reviews for ${room.name}`} />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default PlaceRoomsPage;
