import { useParams, useNavigate } from "react-router-dom";
import { CheckCircle2, Phone, Calendar, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { villages } from "@/data/mockData";

const ConfirmationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const experience = villages.flatMap((v) => v.experiences).find((e) => e.id === id);
  if (!experience) return <div className="p-6">Not found</div>;

  const fundContribution = Math.round(experience.price * 0.05);

  return (
    <div className="min-h-screen bg-background px-5 pt-12 pb-24 flex flex-col items-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="w-16 h-16 rounded-full bg-trust/10 flex items-center justify-center mb-6"
      >
        <CheckCircle2 className="w-8 h-8 text-trust" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center max-w-sm"
      >
        <h1 className="font-display text-2xl font-bold mb-2">Booking Confirmed!</h1>
        <p className="text-sm text-muted-foreground mb-8">Your rural adventure awaits</p>

        <div className="glass-card p-5 text-left space-y-4 mb-6">
          <div>
            <p className="text-xs text-muted-foreground">Booking ID</p>
            <p className="font-mono font-semibold text-sm">VC-{Date.now().toString(36).toUpperCase()}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Experience</p>
            <p className="font-semibold text-sm">{experience.title}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Village</p>
            <p className="font-semibold text-sm">{experience.villageName}</p>
          </div>
        </div>

        <div className="space-y-3 mb-8">
          <button className="w-full py-3 rounded-xl bg-destructive/10 text-destructive font-semibold flex items-center justify-center gap-2">
            <Phone className="w-4 h-4" />
            Emergency Contact
          </button>
          <button className="w-full py-3 rounded-xl bg-secondary text-secondary-foreground font-medium flex items-center justify-center gap-2">
            <Calendar className="w-4 h-4" />
            Add to Calendar
          </button>
        </div>

        <button
          onClick={() => navigate(`/impact/${experience.villageId}`)}
          className="w-full py-4 rounded-2xl bg-trust/10 text-trust font-semibold flex items-center justify-center gap-2 border border-trust/20 hover:bg-trust/15 transition-colors"
        >
          <Eye className="w-4 h-4" />
          See Your Impact — ${fundContribution} contributed
        </button>

        <button
          onClick={() => navigate("/explore")}
          className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Back to Explore
        </button>
      </motion.div>
    </div>
  );
};

export default ConfirmationPage;
