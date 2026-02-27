import { useParams, useNavigate } from "react-router-dom";
import { Flame, Leaf, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { dishes } from "@/data/mockData";

const DishDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dish = dishes.find((d) => d.id === id);

  if (!dish) return <div className="p-6">Dish not found</div>;

  return (
    <div className="pb-24">
      <div className="relative">
        <img src={dish.image} alt={dish.name} className="w-full h-64 object-cover" />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-sm"
        >
          ←
        </button>
      </div>

      <div className="px-5 pt-5">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-2xl font-bold">{dish.name}</h1>
          <p className="text-sm text-muted-foreground mt-1">{dish.villageName}</p>

          <div className="flex items-center gap-3 mt-3">
            <div className="flex items-center gap-1">
              {Array.from({ length: dish.spiceLevel }).map((_, j) => (
                <Flame key={j} className="w-4 h-4 text-accent" />
              ))}
            </div>
            {dish.vegetarian && (
              <span className="flex items-center gap-1 text-trust text-sm font-medium">
                <Leaf className="w-4 h-4" /> Vegetarian
              </span>
            )}
          </div>

          <section className="mt-6">
            <h2 className="font-display font-semibold mb-2">Story of This Dish</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{dish.story}</p>
          </section>

          <section className="mt-6">
            <h2 className="font-display font-semibold mb-3">Locally Sourced Ingredients</h2>
            <div className="space-y-2">
              {dish.ingredients.map((ing) => (
                <div key={ing} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-trust" />
                  <span>{ing}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-6 glass-card p-5">
            <h2 className="font-display font-semibold mb-2">Cooking Class</h2>
            <p className="text-sm text-muted-foreground mb-3">
              Learn to make this dish with a village grandmother. Hands-on experience with local techniques.
            </p>
            <p className="text-lg font-bold">₹{dish.cookingClassPrice}<span className="text-sm font-normal text-muted-foreground">/person</span></p>
          </section>
        </motion.div>
      </div>

      <div className="fixed bottom-16 left-0 right-0 p-4 bg-background/95 backdrop-blur-md border-t z-30">
        <button
          onClick={() => navigate(`/village/${dish.villageId}`)}
          className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-semibold transition-all hover:opacity-90 active:scale-[0.98]"
        >
          Book Cooking Experience — ₹{dish.cookingClassPrice}
        </button>
      </div>
    </div>
  );
};

export default DishDetailPage;
