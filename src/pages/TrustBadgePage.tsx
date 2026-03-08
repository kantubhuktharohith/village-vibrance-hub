import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck, CheckCircle, Clock, FileText, Fingerprint } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const steps = [
  { icon: FileText, label: "Government ID Upload", description: "Aadhaar, PAN, or Passport", done: false },
  { icon: Fingerprint, label: "Biometric Verification", description: "Face match with ID photo", done: false },
  { icon: ShieldCheck, label: "Trust Badge Issued", description: "Visible on your profile", done: false },
];

const TrustBadgePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background px-5 pt-6 pb-24">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl font-bold mb-2">Trust Badge</h1>
        <p className="text-muted-foreground text-sm mb-8">
          Verify your identity to earn a Trust Badge — villages trust verified travelers more.
        </p>

        <div className="bg-trust/5 border border-trust/20 rounded-2xl p-5 mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-trust/10 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-trust" />
            </div>
            <div>
              <p className="font-semibold text-sm">Current Status</p>
              <div className="flex items-center gap-1.5 text-xs mt-0.5">
                <Clock className="w-3 h-3 text-muted-foreground" />
                <span className="text-muted-foreground">Not yet verified</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Verified travelers get priority booking and exclusive experiences.
          </p>
        </div>

        <h2 className="font-semibold text-sm mb-4">Verification Steps</h2>
        <div className="space-y-3 mb-8">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-border">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step.done ? "bg-trust/10" : "bg-secondary"
              }`}>
                {step.done ? (
                  <CheckCircle className="w-5 h-5 text-trust" />
                ) : (
                  <step.icon className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{step.label}</p>
                <p className="text-xs text-muted-foreground">{step.description}</p>
              </div>
              <span className={`text-[10px] font-semibold px-2 py-1 rounded-full ${
                step.done ? "bg-trust/10 text-trust" : "bg-secondary text-muted-foreground"
              }`}>
                {step.done ? "Done" : "Pending"}
              </span>
            </div>
          ))}
        </div>

        <button className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-semibold transition-all hover:opacity-90 active:scale-[0.98]">
          Start Verification
        </button>
      </motion.div>
    </div>
  );
};

export default TrustBadgePage;
