import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TopBarProps {
  title?: string;
  showBack?: boolean;
}

const TopBar = ({ title, showBack }: TopBarProps) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between px-5 py-3 bg-background/95 backdrop-blur-md border-b">
      <div className="flex items-center gap-3">
        {showBack && (
          <button onClick={() => navigate(-1)} className="text-foreground font-medium text-sm">
            ← Back
          </button>
        )}
        {title && <h1 className="font-display text-lg font-semibold">{title}</h1>}
        {!title && !showBack && (
          <span className="font-display text-lg font-bold text-gradient-trust">VillageConnect</span>
        )}
      </div>
      <button
        onClick={() => navigate("/profile")}
        className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground hover:bg-muted transition-colors"
      >
        <User className="w-4.5 h-4.5" />
      </button>
    </header>
  );
};

export default TopBar;
