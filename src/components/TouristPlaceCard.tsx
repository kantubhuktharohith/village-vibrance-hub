import { MapPin, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TrustBadge from "./TrustBadge";

interface TouristPlaceCardProps {
  place: {
    id: string;
    name: string;
    region: string;
    image_url: string | null;
    starting_price: number;
    verified: boolean;
  };
}

const TouristPlaceCard = ({ place }: TouristPlaceCardProps) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/place/${place.id}`)}
      className="rounded-2xl border border-border bg-card overflow-hidden text-left w-full transition-all hover:shadow-lg active:scale-[0.98]"
    >
      <div className="relative">
        {place.image_url ? (
          <img src={place.image_url} alt={place.name} className="w-full h-44 object-cover" loading="lazy" />
        ) : (
          <div className="w-full h-44 bg-secondary flex items-center justify-center">
            <MapPin className="w-10 h-10 text-muted-foreground" />
          </div>
        )}
        {place.verified && (
          <div className="absolute top-3 left-3">
            <TrustBadge variant="solid" />
          </div>
        )}
        {place.starting_price > 0 && (
          <div className="absolute bottom-3 right-3 bg-background/90 backdrop-blur-sm rounded-lg px-2.5 py-1 text-sm font-semibold">
            From ₹{place.starting_price}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-display text-lg font-semibold text-foreground">{place.name}</h3>
        <p className="text-sm text-muted-foreground mt-0.5">{place.region}</p>
      </div>
    </button>
  );
};

export default TouristPlaceCard;
