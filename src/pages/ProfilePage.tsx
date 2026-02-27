import { useNavigate } from "react-router-dom";
import { User, ShieldCheck, CreditCard, Heart, HelpCircle, LogOut, ChevronRight } from "lucide-react";

const sections = [
  { icon: User, label: "Personal Info", path: "#" },
  { icon: ShieldCheck, label: "Trust Badge Status", path: "#", badge: "Verified" },
  { icon: CreditCard, label: "Payment Methods", path: "#" },
  { icon: Heart, label: "Saved Villages", path: "#" },
  { icon: HelpCircle, label: "Support", path: "#" },
];

const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <div className="px-5 py-4 pb-24">
      {/* Profile header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <User className="w-7 h-7 text-primary" />
        </div>
        <div>
          <h2 className="font-display text-xl font-bold">Traveler</h2>
          <div className="trust-badge mt-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            Trust Verified
          </div>
        </div>
      </div>

      <div className="space-y-1">
        {sections.map((s) => (
          <button
            key={s.label}
            className="w-full flex items-center gap-3 p-4 rounded-xl text-left hover:bg-secondary transition-colors"
          >
            <s.icon className="w-5 h-5 text-muted-foreground" />
            <span className="flex-1 font-medium text-sm">{s.label}</span>
            {s.badge && <span className="trust-badge text-[10px]">{s.badge}</span>}
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        ))}
      </div>

      <button
        onClick={() => navigate("/")}
        className="w-full flex items-center gap-3 p-4 rounded-xl mt-4 text-destructive hover:bg-destructive/5 transition-colors"
      >
        <LogOut className="w-5 h-5" />
        <span className="font-medium text-sm">Logout</span>
      </button>
    </div>
  );
};

export default ProfilePage;
