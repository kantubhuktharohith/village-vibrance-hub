import { useParams, useNavigate } from "react-router-dom";
import { Star, ShieldCheck, Heart, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";
import TrustBadge from "@/components/TrustBadge";
import { villages } from "@/data/mockData";

const VillageProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const village = villages.find((v) => v.id === id);

  if (!village) return <div className="p-6">Village not found</div>;

  return (
    <div className="pb-24">
      {/* Hero */}
      <div className="relative">
        <img src={village.image} alt={village.name} className="w-full h-72 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground text-sm"
        >
          ←
        </button>
        <button className="absolute top-4 right-4 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground">
          <Heart className="w-4 h-4" />
        </button>
        {/* Trust badges overlay */}
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
          <TrustBadge variant="solid" />
          <span className="impact-highlight">
            <ShieldCheck className="w-3.5 h-3.5" />
            Secure Escrow Payments
          </span>
        </div>
      </div>

      <div className="px-5 pt-5">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-2xl font-bold">{village.name}</h1>
          <div className="flex items-center gap-2 mt-1.5 text-muted-foreground text-sm">
            <MapPin className="w-3.5 h-3.5" />
            {village.region}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Star className="w-4 h-4 fill-accent text-accent" />
            <span className="font-semibold">{village.rating}</span>
            <span className="text-sm text-muted-foreground">({village.reviews} reviews)</span>
          </div>

          {/* Overview */}
          <section className="mt-6">
            <h2 className="font-display text-lg font-semibold mb-2">Overview</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{village.description}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {village.highlights.map((h) => (
                <span key={h} className="px-3 py-1.5 rounded-full bg-secondary text-xs font-medium text-secondary-foreground">
                  {h}
                </span>
              ))}
            </div>
          </section>

          {/* Experiences */}
          <section className="mt-8">
            <h2 className="font-display text-lg font-semibold mb-3">Experiences</h2>
            {village.experiences.map((exp) => (
              <button
                key={exp.id}
                onClick={() => navigate(`/experience/${exp.id}`)}
                className="w-full glass-card overflow-hidden text-left mb-3 transition-all hover:shadow-md active:scale-[0.99]"
              >
                <img src={exp.image} alt={exp.title} className="w-full h-36 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold">{exp.title}</h3>
                  <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{exp.duration}</span>
                    <span className="font-semibold text-foreground">₹{exp.price}/person</span>
                  </div>
                </div>
              </button>
            ))}
          </section>

          {/* Village Development Impact */}
          <section className="mt-8 p-5 rounded-2xl bg-trust/5 border border-trust/15">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-5 h-5 text-trust" />
              <h2 className="font-display text-lg font-semibold">Village Development Impact</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{village.fundProject}</p>
            <div className="w-full h-3 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-trust transition-all"
                style={{ width: `${village.fundProgress}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>₹{village.fundContribution} raised</span>
              <span>{village.fundProgress}% complete</span>
            </div>
          </section>
        </motion.div>
      </div>

      {/* Sticky bottom */}
      <div className="fixed bottom-16 left-0 right-0 p-4 bg-background/95 backdrop-blur-md border-t z-30">
        <button
          onClick={() => navigate(`/experience/${village.experiences[0]?.id}`)}
          className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-semibold transition-all hover:opacity-90 active:scale-[0.98]"
        >
          Book Experience — From ₹{village.startingPrice}
        </button>
      </div>
    </div>
  );
};

export default VillageProfilePage;
