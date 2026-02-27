import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShieldCheck, Lock } from "lucide-react";
import { motion } from "framer-motion";
import TrustBadge from "@/components/TrustBadge";
import { villages } from "@/data/mockData";

const CheckoutPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);

  const experience = villages.flatMap((v) => v.experiences).find((e) => e.id === id);
  if (!experience) return <div className="p-6">Experience not found</div>;

  const platformFee = Math.round(experience.price * 0.1);
  const fundContribution = Math.round(experience.price * 0.05);
  const total = experience.price + platformFee + fundContribution;

  return (
    <div className="min-h-screen bg-background px-5 pt-5 pb-8">
      <button onClick={() => navigate(-1)} className="text-sm text-muted-foreground mb-6">
        ← Back
      </button>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl font-bold mb-1">Checkout</h1>
        <p className="text-sm text-muted-foreground mb-6">{experience.title}</p>

        <div className="mb-3">
          <TrustBadge />
        </div>

        {/* Price breakdown */}
        <div className="glass-card p-5 space-y-4 mb-6">
          <h2 className="font-display font-semibold">Price Breakdown</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Base price (1 person)</span>
              <span className="font-medium">${experience.price}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Platform fee</span>
              <span className="font-medium">${platformFee}</span>
            </div>
            <div className="flex justify-between text-sm">
              <div className="flex items-center gap-1.5">
                <span className="text-trust font-semibold">Village Development Fund</span>
                <ShieldCheck className="w-3.5 h-3.5 text-trust" />
              </div>
              <span className="font-semibold text-trust">${fundContribution}</span>
            </div>
            <div className="border-t pt-3 flex justify-between">
              <span className="font-semibold">Total</span>
              <span className="text-xl font-bold">${total}</span>
            </div>
          </div>
        </div>

        {/* Fund highlight */}
        <div className="p-4 rounded-2xl bg-trust/5 border border-trust/15 mb-6">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-trust">${fundContribution}</span> goes directly to the village development fund. 100% transparent allocation.
          </p>
        </div>

        {/* Escrow agreement */}
        <label className="flex items-start gap-3 mb-8 cursor-pointer">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 w-4 h-4 rounded border-border accent-primary"
          />
          <span className="text-sm text-muted-foreground">
            I understand funds are held in <span className="font-semibold text-foreground">secure escrow</span> until the experience is completed
          </span>
        </label>

        <button
          onClick={() => agreed && navigate(`/confirmation/${experience.id}`)}
          disabled={!agreed}
          className={`w-full py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all ${
            agreed
              ? "bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.98]"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          <Lock className="w-4 h-4" />
          Pay Securely — ${total}
        </button>
      </motion.div>
    </div>
  );
};

export default CheckoutPage;
