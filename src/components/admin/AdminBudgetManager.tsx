import { useState, useEffect } from "react";
import { Calculator, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
  places: { id: string; name: string }[];
}

const AdminBudgetManager = ({ places }: Props) => {
  const { toast } = useToast();
  const [selectedPlace, setSelectedPlace] = useState<string>("");
  const [existingId, setExistingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    avg_food_cost_per_day: "",
    avg_room_cost_per_night: "",
    avg_transport_cost_per_day: "",
    avg_activity_cost_per_day: "",
  });

  useEffect(() => {
    if (!selectedPlace) return;
    const fetch = async () => {
      const { data } = await supabase.from("place_budget_info").select("*").eq("place_id", selectedPlace).single();
      if (data) {
        setExistingId(data.id);
        setForm({
          avg_food_cost_per_day: String(data.avg_food_cost_per_day),
          avg_room_cost_per_night: String(data.avg_room_cost_per_night),
          avg_transport_cost_per_day: String(data.avg_transport_cost_per_day),
          avg_activity_cost_per_day: String(data.avg_activity_cost_per_day),
        });
      } else {
        setExistingId(null);
        setForm({ avg_food_cost_per_day: "", avg_room_cost_per_night: "", avg_transport_cost_per_day: "", avg_activity_cost_per_day: "" });
      }
    };
    fetch();
  }, [selectedPlace]);

  const handleSave = async () => {
    if (!selectedPlace) {
      toast({ title: "Error", description: "Select a place first", variant: "destructive" });
      return;
    }
    const payload = {
      place_id: selectedPlace,
      avg_food_cost_per_day: parseInt(form.avg_food_cost_per_day) || 0,
      avg_room_cost_per_night: parseInt(form.avg_room_cost_per_night) || 0,
      avg_transport_cost_per_day: parseInt(form.avg_transport_cost_per_day) || 0,
      avg_activity_cost_per_day: parseInt(form.avg_activity_cost_per_day) || 0,
    };

    if (existingId) {
      const { error } = await supabase.from("place_budget_info").update(payload).eq("id", existingId);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    } else {
      const { error } = await supabase.from("place_budget_info").insert(payload);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    }
    toast({ title: "Saved", description: "Budget info updated" });
  };

  return (
    <div className="space-y-4">
      <h3 className="font-display text-lg font-bold flex items-center gap-2">
        <Calculator className="w-5 h-5 text-accent" /> Budget Info
      </h3>

      <Select value={selectedPlace} onValueChange={setSelectedPlace}>
        <SelectTrigger><SelectValue placeholder="Select a place" /></SelectTrigger>
        <SelectContent>{places.map((p) => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}</SelectContent>
      </Select>

      {selectedPlace && (
        <div className="rounded-2xl border border-border bg-card p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-muted-foreground">Avg Food Cost/Day (₹)</Label>
              <Input type="number" value={form.avg_food_cost_per_day} onChange={(e) => setForm({ ...form, avg_food_cost_per_day: e.target.value })} />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Avg Room Cost/Night (₹)</Label>
              <Input type="number" value={form.avg_room_cost_per_night} onChange={(e) => setForm({ ...form, avg_room_cost_per_night: e.target.value })} />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Avg Transport Cost/Day (₹)</Label>
              <Input type="number" value={form.avg_transport_cost_per_day} onChange={(e) => setForm({ ...form, avg_transport_cost_per_day: e.target.value })} />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Avg Activity Cost/Day (₹)</Label>
              <Input type="number" value={form.avg_activity_cost_per_day} onChange={(e) => setForm({ ...form, avg_activity_cost_per_day: e.target.value })} />
            </div>
          </div>
          <Button onClick={handleSave} className="w-full gap-2">
            <Save className="w-4 h-4" /> {existingId ? "Update" : "Save"} Budget Info
          </Button>
        </div>
      )}
    </div>
  );
};

export default AdminBudgetManager;
