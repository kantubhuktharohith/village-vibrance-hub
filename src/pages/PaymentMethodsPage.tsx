import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CreditCard, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const PaymentMethodsPage = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([
    { id: "1", type: "UPI", label: "user@ybl", isDefault: true },
  ]);

  const removeCard = (id: string) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
    toast.success("Payment method removed");
  };

  return (
    <div className="min-h-screen bg-background px-5 pt-6 pb-24">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl font-bold mb-6">Payment Methods</h1>

        <div className="space-y-3 mb-8">
          {cards.map((card) => (
            <div key={card.id} className="flex items-center gap-4 p-4 rounded-xl border border-border">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{card.label}</p>
                <p className="text-xs text-muted-foreground">{card.type}</p>
              </div>
              {card.isDefault && (
                <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-primary/10 text-primary">Default</span>
              )}
              <button onClick={() => removeCard(card.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}

          {cards.length === 0 && (
            <div className="text-center py-8">
              <CreditCard className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No payment methods added</p>
            </div>
          )}
        </div>

        <button
          onClick={() => toast.info("Payment gateway integration coming soon!")}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl border-2 border-dashed border-border text-muted-foreground font-medium text-sm hover:border-primary hover:text-primary transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Payment Method
        </button>
      </motion.div>
    </div>
  );
};

export default PaymentMethodsPage;
