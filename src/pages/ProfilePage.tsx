import { useNavigate } from "react-router-dom";
import { User, ShieldCheck, CreditCard, Heart, HelpCircle, LogOut, ChevronRight, Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useAdminCheck } from "@/hooks/useAdminCheck";

const sections = [
  { icon: User, label: "Personal Info", path: "/profile/personal-info" },
  { icon: ShieldCheck, label: "Trust Badge Status", path: "/profile/trust-badge", badge: "Pending" },
  { icon: CreditCard, label: "Payment Methods", path: "/profile/payment-methods" },
  { icon: Heart, label: "Saved Villages", path: "/profile/saved-villages" },
  { icon: HelpCircle, label: "Support", path: "/profile/support" },
];

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { isAdmin } = useAdminCheck();

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const displayName = user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split("@")[0] || "Traveler";
  const avatarUrl = user?.user_metadata?.avatar_url;

  return (
    <div className="px-5 py-4 pb-24">
      {/* Profile header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
          {avatarUrl ? (
            <img src={avatarUrl} alt={displayName} className="w-full h-full object-cover" />
          ) : (
            <User className="w-7 h-7 text-primary" />
          )}
        </div>
        <div>
          <h2 className="font-display text-xl font-bold">{displayName}</h2>
          <p className="text-xs text-muted-foreground">{user?.email}</p>
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
            onClick={() => navigate(s.path)}
            className="w-full flex items-center gap-3 p-4 rounded-xl text-left hover:bg-secondary transition-colors"
          >
            <s.icon className="w-5 h-5 text-muted-foreground" />
            <span className="flex-1 font-medium text-sm">{s.label}</span>
            {s.badge && <span className="trust-badge text-[10px]">{s.badge}</span>}
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        ))}
      </div>

      {isAdmin && (
        <button
          onClick={() => navigate("/admin")}
          className="w-full flex items-center gap-3 p-4 rounded-xl mt-2 text-primary hover:bg-primary/5 transition-colors border border-primary/20"
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium text-sm">Admin Panel</span>
          <ChevronRight className="w-4 h-4 ml-auto" />
        </button>
      )}

      <button
        onClick={handleLogout}
        className="w-full flex items-center gap-3 p-4 rounded-xl mt-4 text-destructive hover:bg-destructive/5 transition-colors"
      >
        <LogOut className="w-5 h-5" />
        <span className="font-medium text-sm">Logout</span>
      </button>
    </div>
  );
};

export default ProfilePage;
