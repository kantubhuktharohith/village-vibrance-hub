import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calculator, IndianRupee, TrendingUp, UtensilsCrossed, BedDouble, Bus, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface BudgetInfo {
  avg_food_cost_per_day: number;
  avg_room_cost_per_night: number;
  avg_transport_cost_per_day: number;
  avg_activity_cost_per_day: number;
}

const PlaceBudgetPage = () => {
  const { placeId } = useParams();
  const navigate = useNavigate();
  const [budget, setBudget] = useState<BudgetInfo | null>(null);
  const [placeName, setPlaceName] = useState("");
  const [loading, setLoading] = useState(true);

  const [days, setDays] = useState(3);
  const [people, setPeople] = useState(2);

  useEffect(() => {
    const fetchData = async () => {
      const [budgetRes, placeRes] = await Promise.all([
        supabase.from("place_budget_info").select("*").eq("place_id", placeId).single(),
        supabase.from("tourist_places").select("name").eq("id", placeId).single(),
      ]);
      if (budgetRes.data) setBudget(budgetRes.data as BudgetInfo);
      if (placeRes.data) setPlaceName(placeRes.data.name);
      setLoading(false);
    };
    if (placeId) fetchData();
  }, [placeId]);

  const dailyTotal = budget
    ? budget.avg_food_cost_per_day + budget.avg_room_cost_per_night + budget.avg_transport_cost_per_day + budget.avg_activity_cost_per_day
    : 0;

  const estimatedTotal = dailyTotal * days * people;

  const costItems = budget
    ? [
        { icon: UtensilsCrossed, label: "Food", cost: budget.avg_food_cost_per_day, color: "text-accent" },
        { icon: BedDouble, label: "Stay", cost: budget.avg_room_cost_per_night, color: "text-primary" },
        { icon: Bus, label: "Transport", cost: budget.avg_transport_cost_per_day, color: "text-impact" },
        { icon: Sparkles, label: "Activities", cost: budget.avg_activity_cost_per_day, color: "text-village-warm" },
      ]
    : [];

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="flex items-center gap-3 px-5 py-4">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center">
            <ArrowLeft className="w-4.5 h-4.5" />
          </button>
          <div>
            <h1 className="font-display text-xl font-bold">Budget Planner</h1>
            <p className="text-xs text-muted-foreground">{placeName}</p>
          </div>
        </div>
      </div>

      <div className="px-5 py-4">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : !budget ? (
          <div className="text-center py-12">
            <Calculator className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">Budget information not available yet for this place.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Average daily costs */}
            <div>
              <h2 className="font-display text-lg font-bold mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" /> Average Daily Costs
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {costItems.map((item) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-2xl border border-border bg-card p-4 text-center"
                  >
                    <item.icon className={`w-6 h-6 mx-auto mb-2 ${item.color}`} />
                    <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                    <p className="text-lg font-bold">₹{item.cost}</p>
                    <p className="text-[10px] text-muted-foreground">per day</p>
                  </motion.div>
                ))}
              </div>
              <div className="mt-3 rounded-2xl bg-primary/10 border border-primary/20 p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">Total Daily Average</p>
                <p className="text-2xl font-bold text-primary">₹{dailyTotal}</p>
                <p className="text-[10px] text-muted-foreground">per person / day</p>
              </div>
            </div>

            <Separator />

            {/* Trip calculator */}
            <div>
              <h2 className="font-display text-lg font-bold mb-3 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-accent" /> Trip Calculator
              </h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Number of Days</Label>
                  <Input
                    type="number"
                    min={1}
                    max={30}
                    value={days}
                    onChange={(e) => setDays(Math.max(1, parseInt(e.target.value) || 1))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Number of People</Label>
                  <Input
                    type="number"
                    min={1}
                    max={20}
                    value={people}
                    onChange={(e) => setPeople(Math.max(1, parseInt(e.target.value) || 1))}
                    className="mt-1"
                  />
                </div>
              </div>

              <motion.div
                key={`${days}-${people}`}
                initial={{ scale: 0.98 }}
                animate={{ scale: 1 }}
                className="rounded-2xl bg-accent/10 border border-accent/20 p-5 text-center"
              >
                <p className="text-xs text-muted-foreground mb-1">Estimated Total Budget</p>
                <div className="flex items-center justify-center gap-1">
                  <IndianRupee className="w-6 h-6 text-accent" />
                  <span className="text-3xl font-bold text-accent">{estimatedTotal.toLocaleString("en-IN")}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {days} days × {people} {people === 1 ? "person" : "people"} × ₹{dailyTotal}/day
                </p>
              </motion.div>

              {/* Breakdown */}
              <div className="mt-4 space-y-2">
                {costItems.map((item) => {
                  const total = item.cost * days * people;
                  return (
                    <div key={item.label} className="flex items-center justify-between py-2 px-3 rounded-xl bg-secondary">
                      <span className="flex items-center gap-2 text-sm">
                        <item.icon className={`w-4 h-4 ${item.color}`} />
                        {item.label}
                      </span>
                      <span className="font-semibold text-sm">₹{total.toLocaleString("en-IN")}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaceBudgetPage;
