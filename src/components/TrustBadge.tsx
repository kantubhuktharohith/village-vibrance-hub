import { ShieldCheck } from "lucide-react";

interface TrustBadgeProps {
  variant?: "subtle" | "solid";
  className?: string;
}

const TrustBadge = ({ variant = "subtle", className = "" }: TrustBadgeProps) => {
  return (
    <span className={`${variant === "solid" ? "trust-badge-solid" : "trust-badge"} ${className}`}>
      <ShieldCheck className="w-3.5 h-3.5" />
      Verified Village
    </span>
  );
};

export default TrustBadge;
