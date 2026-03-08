import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, MapPin, Star } from "lucide-react";
import { villages } from "@/data/mockData";

const SavedVillagesPage = () => {
  const navigate = useNavigate();
  // Mock saved villages (first 3)
  const saved = villages.slice(0, 3);

  return (
    <div className="min-h-screen bg-background px-5 pt-6 pb-24">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl font-bold mb-6">Saved Villages</h1>

        <div className="space-y-4">
          {saved.map((village) => (
            <button
              key={village.id}
              onClick={() => navigate(`/village/${village.id}`)}
              className="w-full flex gap-4 p-3 rounded-xl border border-border text-left hover:bg-secondary/50 transition-colors"
            >
              <img src={village.image} alt={village.name} className="w-20 h-20 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-sm truncate">{village.name}</h3>
                  <Heart className="w-4 h-4 text-destructive fill-destructive flex-shrink-0" />
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{village.region}</span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-3 h-3 text-accent fill-accent" />
                  <span className="text-xs font-medium">{village.rating}</span>
                  <span className="text-xs text-muted-foreground">({village.reviews})</span>
                </div>
                <p className="text-xs font-semibold text-primary mt-1">
                  From ₹{village.startingPrice.toLocaleString("en-IN")}
                </p>
              </div>
            </button>
          ))}
        </div>

        {saved.length === 0 && (
          <div className="text-center py-12">
            <Heart className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">No saved villages yet</p>
            <button onClick={() => navigate("/explore")} className="text-sm text-primary font-medium mt-2">
              Explore Villages
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default SavedVillagesPage;
