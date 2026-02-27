import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const interests = ["Food", "Culture", "Eco", "Adventure", "Wellness", "Photography", "History", "Crafts"];

const ProfileSetupPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (i: string) =>
    setSelected((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));

  return (
    <div className="min-h-screen bg-background px-6 pt-16 pb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-sm mx-auto"
      >
        <button onClick={() => navigate(-1)} className="text-sm text-muted-foreground mb-8">
          ← Back
        </button>

        <h1 className="font-display text-3xl font-bold mb-2">Quick Setup</h1>
        <p className="text-muted-foreground mb-8">Tell us what excites you about rural travel</p>

        <div className="space-y-6">
          <div>
            <label className="text-sm font-semibold mb-2 block">Your Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full p-4 rounded-xl border-2 border-border bg-background text-foreground focus:border-primary focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="text-sm font-semibold mb-3 block">Travel Interests</label>
            <div className="flex flex-wrap gap-2">
              {interests.map((i) => (
                <button
                  key={i}
                  onClick={() => toggle(i)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selected.includes(i)
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-muted"
                  }`}
                >
                  {i}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold mb-2 block">
              Emergency Contact <span className="text-muted-foreground font-normal">(optional)</span>
            </label>
            <input
              placeholder="+91 XXXXX XXXXX"
              className="w-full p-4 rounded-xl border-2 border-border bg-background text-foreground focus:border-primary focus:outline-none transition-colors"
            />
          </div>
        </div>

        <button
          onClick={() => navigate("/explore")}
          className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-semibold mt-8 transition-all hover:opacity-90 active:scale-[0.98]"
        >
          Complete Setup
        </button>
      </motion.div>
    </div>
  );
};

export default ProfileSetupPage;
