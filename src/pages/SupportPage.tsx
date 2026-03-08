import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, HelpCircle, MessageCircle, Mail, Phone, ChevronRight, ExternalLink } from "lucide-react";
import { toast } from "sonner";

const supportOptions = [
  { icon: MessageCircle, label: "Live Chat", description: "Chat with our support team", action: "chat" },
  { icon: Mail, label: "Email Support", description: "support@villageconnect.in", action: "email" },
  { icon: Phone, label: "Emergency Helpline", description: "+91 1800-XXX-XXXX (24/7)", action: "phone" },
];

const faqs = [
  { q: "How are villages verified?", a: "Every village undergoes a 5-step verification process including on-ground visits, safety audits, and community leader interviews." },
  { q: "Is my payment secure?", a: "Yes. All payments go through an escrow system. Funds are released to the village only after your experience is completed." },
  { q: "Can I cancel a booking?", a: "Free cancellation up to 48 hours before. After that, 50% refund to support village preparation costs." },
  { q: "What if there's an emergency?", a: "Every booking includes 24/7 emergency support. Local emergency contacts are provided before your trip." },
];

const SupportPage = () => {
  const navigate = useNavigate();

  const handleAction = (action: string) => {
    switch (action) {
      case "chat":
        toast.info("Live chat coming soon!");
        break;
      case "email":
        window.location.href = "mailto:support@villageconnect.in";
        break;
      case "phone":
        window.location.href = "tel:+911800000000";
        break;
    }
  };

  return (
    <div className="min-h-screen bg-background px-5 pt-6 pb-24">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl font-bold mb-2">Support</h1>
        <p className="text-muted-foreground text-sm mb-6">We're here to help with your village travel experience.</p>

        <div className="space-y-3 mb-8">
          {supportOptions.map((opt) => (
            <button
              key={opt.action}
              onClick={() => handleAction(opt.action)}
              className="w-full flex items-center gap-4 p-4 rounded-xl border border-border hover:bg-secondary/50 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <opt.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-sm">{opt.label}</p>
                <p className="text-xs text-muted-foreground">{opt.description}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          ))}
        </div>

        <h2 className="font-semibold text-sm mb-4">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <details key={i} className="group rounded-xl border border-border overflow-hidden">
              <summary className="flex items-center gap-3 p-4 cursor-pointer list-none">
                <HelpCircle className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <span className="flex-1 font-medium text-sm">{faq.q}</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground transition-transform group-open:rotate-90" />
              </summary>
              <div className="px-4 pb-4 pt-0">
                <p className="text-sm text-muted-foreground pl-7">{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SupportPage;
