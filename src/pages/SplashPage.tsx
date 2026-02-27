import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, Mountain } from "lucide-react";
import heroImage from "@/assets/hero-village.jpg";

const SplashPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      <img
        src={heroImage}
        alt="Rural village landscape"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-foreground/10" />

      <div className="relative z-10 flex flex-col flex-1 justify-end px-6 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-6"
        >
          <div className="flex items-center gap-2">
            <Mountain className="w-8 h-8 text-trust-glow" />
            <span className="font-display text-3xl font-bold text-primary-foreground">
              VillageConnect
            </span>
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-trust-glow" />
            <p className="text-primary-foreground/80 text-base font-medium">
              Secure Rural Travel & Food Experiences
            </p>
          </div>

          <p className="text-primary-foreground/60 text-sm leading-relaxed max-w-xs">
            Discover verified villages, authentic food, and transparent impact — every booking builds trust.
          </p>

          <div className="space-y-3 pt-4">
            <button
              onClick={() => navigate("/signup")}
              className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-base transition-all hover:opacity-90 active:scale-[0.98]"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate("/explore")}
              className="w-full py-3 text-primary-foreground/70 text-sm font-medium hover:text-primary-foreground transition-colors"
            >
              Explore as Guest
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SplashPage;
