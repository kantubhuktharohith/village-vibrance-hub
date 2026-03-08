import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, User, Camera, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const PersonalInfoPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [fullName, setFullName] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("full_name, emergency_contact")
      .eq("user_id", user.id)
      .single()
      .then(({ data }) => {
        if (data) {
          setFullName(data.full_name || "");
          setEmergencyContact(data.emergency_contact || "");
        }
        setFetching(false);
      });
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ full_name: fullName, emergency_contact: emergencyContact || null })
        .eq("user_id", user.id);
      if (error) throw error;
      toast.success("Profile updated!");
      navigate(-1);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-5 pt-6 pb-24">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl font-bold mb-6">Personal Info</h1>

        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
              {user?.user_metadata?.avatar_url ? (
                <img src={user.user_metadata.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <User className="w-8 h-8 text-primary" />
              )}
            </div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <label className="text-sm font-semibold mb-2 block">Full Name</label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your full name"
              className="w-full p-4 rounded-xl border-2 border-border bg-background text-foreground focus:border-primary focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="text-sm font-semibold mb-2 block">Email</label>
            <input
              value={user?.email || ""}
              disabled
              className="w-full p-4 rounded-xl border-2 border-border bg-muted text-muted-foreground cursor-not-allowed"
            />
          </div>

          <div>
            <label className="text-sm font-semibold mb-2 block">Emergency Contact</label>
            <input
              value={emergencyContact}
              onChange={(e) => setEmergencyContact(e.target.value)}
              placeholder="+91 XXXXX XXXXX"
              className="w-full p-4 rounded-xl border-2 border-border bg-background text-foreground focus:border-primary focus:outline-none transition-colors"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-semibold mt-8 transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          Save Changes
        </button>
      </motion.div>
    </div>
  );
};

export default PersonalInfoPage;
