import { useParams, useNavigate } from "react-router-dom";
import { ShieldCheck, TrendingUp, Camera } from "lucide-react";
import { motion } from "framer-motion";
import { villages } from "@/data/mockData";

const ImpactPage = () => {
  const { villageId } = useParams();
  const navigate = useNavigate();
  const village = villages.find((v) => v.id === villageId);

  if (!village) return <div className="p-6">Not found</div>;

  const fundContribution = Math.round(village.startingPrice * 0.05);

  const allocations = [
    { label: "Infrastructure", pct: 40 },
    { label: "Education", pct: 25 },
    { label: "Healthcare", pct: 20 },
    { label: "Environment", pct: 15 },
  ];

  return (
    <div className="min-h-screen bg-background px-5 pt-6 pb-24">
      <button onClick={() => navigate(-1)} className="text-sm text-muted-foreground mb-6">
        ← Back
      </button>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-trust/10 flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-7 h-7 text-trust" />
          </div>
          <h1 className="font-display text-2xl font-bold">Your Impact</h1>
          <p className="text-4xl font-bold text-trust mt-2">₹{fundContribution}</p>
          <p className="text-sm text-muted-foreground mt-1">contributed to Village Development Fund</p>
        </div>

        {/* Fund progress */}
        <div className="glass-card p-5 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck className="w-5 h-5 text-trust" />
            <h2 className="font-display font-semibold">{village.fundProject}</h2>
          </div>
          <div className="w-full h-4 rounded-full bg-muted overflow-hidden mb-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${village.fundProgress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full rounded-full bg-trust"
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>₹{village.fundContribution} of ₹5,000 raised</span>
            <span>{village.fundProgress}%</span>
          </div>
        </div>

        {/* Allocation */}
        <div className="glass-card p-5 mb-6">
          <h2 className="font-display font-semibold mb-4">Fund Allocation</h2>
          <div className="space-y-3">
            {allocations.map((a) => (
              <div key={a.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{a.label}</span>
                  <span className="font-medium">{a.pct}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-accent" style={{ width: `${a.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project photos placeholder */}
        <div className="glass-card p-5 mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Camera className="w-4 h-4 text-muted-foreground" />
            <h2 className="font-display font-semibold">Development Updates</h2>
          </div>
          <div className="rounded-xl overflow-hidden">
            <img src={village.image} alt="Development" className="w-full h-40 object-cover" />
          </div>
          <p className="text-sm text-muted-foreground mt-3">Latest update: Foundation work completed for water purification unit.</p>
        </div>

        <button
          onClick={() => navigate("/explore")}
          className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-semibold transition-all hover:opacity-90 active:scale-[0.98]"
        >
          Back to Home
        </button>
      </motion.div>
    </div>
  );
};

export default ImpactPage;
