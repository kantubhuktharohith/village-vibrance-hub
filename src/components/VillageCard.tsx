import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TrustBadge from "./TrustBadge";
import type { Village } from "@/data/mockData";

interface VillageCardProps {
  village: Village;
}

const VillageCard = ({ village }: VillageCardProps) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/village/${village.id}`)}
      className="glass-card overflow-hidden text-left w-full transition-all hover:shadow-lg active:scale-[0.98]"
    >
      <div className="relative">
        <img
          src={village.image}
          alt={village.name}
          className="w-full h-44 object-cover"
          loading="lazy"
        />
        {village.verified && (
          <div className="absolute top-3 left-3">
            <TrustBadge variant="solid" />
          </div>
        )}
        <div className="absolute bottom-3 right-3 bg-background/90 backdrop-blur-sm rounded-lg px-2.5 py-1 text-sm font-semibold">
          From ₹{village.startingPrice}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-display text-lg font-semibold text-foreground">{village.name}</h3>
        <p className="text-sm text-muted-foreground mt-0.5">{village.region}</p>
        <div className="flex items-center gap-1.5 mt-2">
          <Star className="w-4 h-4 fill-accent text-accent" />
          <span className="text-sm font-semibold">{village.rating}</span>
          <span className="text-sm text-muted-foreground">({village.reviews} reviews)</span>
        </div>
      </div>
    </button>
  );
};

export default VillageCard;
