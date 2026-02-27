import { useParams, useNavigate } from "react-router-dom";
import { Clock, ShieldCheck, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import TrustBadge from "@/components/TrustBadge";
import { villages } from "@/data/mockData";

const ExperienceDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const experience = villages.flatMap((v) => v.experiences).find((e) => e.id === id);
  if (!experience) return <div className="p-6">Experience not found</div>;

  return (
    <div className="pb-24">
      <div className="relative">
        <img src={experience.image} alt={experience.title} className="w-full h-64 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-sm"
        >
          ←
        </button>
        <div className="absolute bottom-4 left-4">
          <TrustBadge variant="solid" />
        </div>
      </div>

      <div className="px-5 pt-5">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-2xl font-bold">{experience.title}</h1>
          <p className="text-sm text-muted-foreground mt-1">{experience.villageName}</p>

          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              {experience.duration}
            </div>
            <span className="text-lg font-bold">₹{experience.price}<span className="text-sm font-normal text-muted-foreground">/person</span></span>
          </div>

          <section className="mt-6">
            <h2 className="font-display font-semibold mb-2">About This Experience</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{experience.description}</p>
          </section>

          <section className="mt-6">
            <h2 className="font-display font-semibold mb-3">What's Included</h2>
            <div className="space-y-2">
              {experience.included.map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-trust" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-6 p-4 rounded-2xl bg-trust/5 border border-trust/15">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-5 h-5 text-trust" />
              <h2 className="font-display font-semibold">Safety Details</h2>
            </div>
            <div className="space-y-2">
              {experience.safety.map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-3.5 h-3.5 text-trust" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>
        </motion.div>
      </div>

      <div className="fixed bottom-16 left-0 right-0 p-4 bg-background/95 backdrop-blur-md border-t z-30">
        <button
          onClick={() => navigate(`/checkout/${experience.id}`)}
          className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-semibold transition-all hover:opacity-90 active:scale-[0.98]"
        >
          Select Date & Continue
        </button>
      </div>
    </div>
  );
};

export default ExperienceDetailPage;
