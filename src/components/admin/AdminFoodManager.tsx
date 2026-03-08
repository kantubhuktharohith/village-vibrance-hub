import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, UtensilsCrossed } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  places: { id: string; name: string }[];
  userId: string;
}

interface FoodItem {
  id: string;
  place_id: string;
  name: string;
  description: string;
  image_url: string | null;
  price_range: string;
  cuisine_type: string;
  is_vegetarian: boolean;
  rating: number;
}

const AdminFoodManager = ({ places, userId }: Props) => {
  const { toast } = useToast();
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<string>("");

  const [form, setForm] = useState({
    place_id: "",
    name: "",
    description: "",
    image_url: "",
    price_range: "",
    cuisine_type: "",
    is_vegetarian: false,
    rating: "",
  });

  const fetchFoods = async () => {
    const query = supabase.from("place_foods").select("*").order("created_at", { ascending: false });
    const { data } = selectedPlace ? await query.eq("place_id", selectedPlace) : await query;
    if (data) setFoods(data as FoodItem[]);
  };

  useEffect(() => { fetchFoods(); }, [selectedPlace]);

  const resetForm = () => {
    setForm({ place_id: "", name: "", description: "", image_url: "", price_range: "", cuisine_type: "", is_vegetarian: false, rating: "" });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async () => {
    if (!form.name || !form.place_id) {
      toast({ title: "Error", description: "Name and place are required", variant: "destructive" });
      return;
    }
    const payload = { ...form, rating: parseFloat(form.rating) || 0, created_by: userId };

    if (editingId) {
      const { error } = await supabase.from("place_foods").update(payload).eq("id", editingId);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Updated", description: "Food item updated" });
    } else {
      const { error } = await supabase.from("place_foods").insert(payload);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Added", description: "Food item added" });
    }
    resetForm();
    fetchFoods();
  };

  const handleEdit = (food: FoodItem) => {
    setForm({
      place_id: food.place_id,
      name: food.name,
      description: food.description,
      image_url: food.image_url || "",
      price_range: food.price_range,
      cuisine_type: food.cuisine_type,
      is_vegetarian: food.is_vegetarian,
      rating: String(food.rating),
    });
    setEditingId(food.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    await supabase.from("place_foods").delete().eq("id", id);
    toast({ title: "Deleted", description: "Food item removed" });
    fetchFoods();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-bold flex items-center gap-2">
          <UtensilsCrossed className="w-5 h-5 text-accent" /> Food Items
        </h3>
        <Button size="sm" onClick={() => { resetForm(); setShowForm(true); }} className="gap-1.5">
          <Plus className="w-4 h-4" /> Add Food
        </Button>
      </div>

      <Select value={selectedPlace} onValueChange={setSelectedPlace}>
        <SelectTrigger><SelectValue placeholder="Filter by place" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Places</SelectItem>
          {places.map((p) => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
        </SelectContent>
      </Select>

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <div className="rounded-2xl border border-border bg-card p-4 space-y-3">
              <Select value={form.place_id} onValueChange={(v) => setForm({ ...form, place_id: v })}>
                <SelectTrigger><SelectValue placeholder="Select place *" /></SelectTrigger>
                <SelectContent>{places.map((p) => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}</SelectContent>
              </Select>
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="Food name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <Input placeholder="Cuisine type" value={form.cuisine_type} onChange={(e) => setForm({ ...form, cuisine_type: e.target.value })} />
              </div>
              <Textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              <div className="grid grid-cols-3 gap-3">
                <Input placeholder="Image URL" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
                <Input placeholder="Price range" value={form.price_range} onChange={(e) => setForm({ ...form, price_range: e.target.value })} />
                <Input placeholder="Rating (0-5)" type="number" step="0.1" value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })} />
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={form.is_vegetarian} onCheckedChange={(v) => setForm({ ...form, is_vegetarian: v })} />
                <Label className="text-sm">Vegetarian</Label>
              </div>
              <div className="flex gap-3">
                <Button onClick={handleSubmit} className="flex-1">{editingId ? "Update" : "Add"}</Button>
                <Button variant="outline" onClick={resetForm}>Cancel</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-2">
        {foods.map((food) => (
          <div key={food.id} className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card">
            {food.image_url ? (
              <img src={food.image_url} alt={food.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
            ) : (
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                <UtensilsCrossed className="w-5 h-5 text-muted-foreground" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">{food.name}</p>
              <p className="text-xs text-muted-foreground">{food.cuisine_type} {food.price_range && `• ₹${food.price_range}`}</p>
            </div>
            <button onClick={() => handleEdit(food)} className="p-2 text-muted-foreground hover:text-foreground"><Edit2 className="w-4 h-4" /></button>
            <button onClick={() => handleDelete(food.id)} className="p-2 text-destructive hover:text-destructive/80"><Trash2 className="w-4 h-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminFoodManager;
