import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, BedDouble } from "lucide-react";
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

interface RoomItem {
  id: string;
  place_id: string;
  name: string;
  description: string;
  image_url: string | null;
  room_type: string;
  price_per_night: number;
  max_guests: number;
  amenities: string[];
  rating: number;
  total_reviews: number;
  available: boolean;
}

const AdminRoomManager = ({ places, userId }: Props) => {
  const { toast } = useToast();
  const [rooms, setRooms] = useState<RoomItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<string>("");

  const [form, setForm] = useState({
    place_id: "",
    name: "",
    description: "",
    image_url: "",
    room_type: "standard",
    price_per_night: "",
    max_guests: "2",
    amenities: "",
    rating: "",
    total_reviews: "0",
    available: true,
  });

  const fetchRooms = async () => {
    const query = supabase.from("place_rooms").select("*").order("created_at", { ascending: false });
    const { data } = selectedPlace ? await query.eq("place_id", selectedPlace) : await query;
    if (data) setRooms(data as RoomItem[]);
  };

  useEffect(() => { fetchRooms(); }, [selectedPlace]);

  const resetForm = () => {
    setForm({ place_id: "", name: "", description: "", image_url: "", room_type: "standard", price_per_night: "", max_guests: "2", amenities: "", rating: "", total_reviews: "0", available: true });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async () => {
    if (!form.name || !form.place_id) {
      toast({ title: "Error", description: "Name and place are required", variant: "destructive" });
      return;
    }
    const payload = {
      place_id: form.place_id,
      name: form.name,
      description: form.description,
      image_url: form.image_url,
      room_type: form.room_type,
      price_per_night: parseInt(form.price_per_night) || 0,
      max_guests: parseInt(form.max_guests) || 2,
      amenities: form.amenities.split(",").map((a) => a.trim()).filter(Boolean),
      rating: parseFloat(form.rating) || 0,
      total_reviews: parseInt(form.total_reviews) || 0,
      available: form.available,
      created_by: userId,
    };

    if (editingId) {
      const { error } = await supabase.from("place_rooms").update(payload).eq("id", editingId);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Updated", description: "Room updated" });
    } else {
      const { error } = await supabase.from("place_rooms").insert(payload);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Added", description: "Room added" });
    }
    resetForm();
    fetchRooms();
  };

  const handleEdit = (room: RoomItem) => {
    setForm({
      place_id: room.place_id,
      name: room.name,
      description: room.description,
      image_url: room.image_url || "",
      room_type: room.room_type,
      price_per_night: String(room.price_per_night),
      max_guests: String(room.max_guests),
      amenities: room.amenities.join(", "),
      rating: String(room.rating),
      total_reviews: String(room.total_reviews),
      available: room.available,
    });
    setEditingId(room.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    await supabase.from("place_rooms").delete().eq("id", id);
    toast({ title: "Deleted", description: "Room removed" });
    fetchRooms();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-bold flex items-center gap-2">
          <BedDouble className="w-5 h-5 text-primary" /> Rooms
        </h3>
        <Button size="sm" onClick={() => { resetForm(); setShowForm(true); }} className="gap-1.5">
          <Plus className="w-4 h-4" /> Add Room
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
                <Input placeholder="Room name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <Select value={form.room_type} onValueChange={(v) => setForm({ ...form, room_type: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["standard", "deluxe", "suite", "dormitory", "cottage", "homestay"].map((t) => (
                      <SelectItem key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              <Input placeholder="Image URL" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
              <div className="grid grid-cols-3 gap-3">
                <Input placeholder="₹ per night *" type="number" value={form.price_per_night} onChange={(e) => setForm({ ...form, price_per_night: e.target.value })} />
                <Input placeholder="Max guests" type="number" value={form.max_guests} onChange={(e) => setForm({ ...form, max_guests: e.target.value })} />
                <Input placeholder="Rating (0-5)" type="number" step="0.1" value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })} />
              </div>
              <Input placeholder="Amenities (comma separated)" value={form.amenities} onChange={(e) => setForm({ ...form, amenities: e.target.value })} />
              <div className="flex items-center gap-2">
                <Switch checked={form.available} onCheckedChange={(v) => setForm({ ...form, available: v })} />
                <Label className="text-sm">Available</Label>
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
        {rooms.map((room) => (
          <div key={room.id} className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card">
            {room.image_url ? (
              <img src={room.image_url} alt={room.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
            ) : (
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                <BedDouble className="w-5 h-5 text-muted-foreground" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">{room.name}</p>
              <p className="text-xs text-muted-foreground">₹{room.price_per_night}/night • {room.max_guests} guests</p>
            </div>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${room.available ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"}`}>
              {room.available ? "Available" : "Booked"}
            </span>
            <button onClick={() => handleEdit(room)} className="p-2 text-muted-foreground hover:text-foreground"><Edit2 className="w-4 h-4" /></button>
            <button onClick={() => handleDelete(room.id)} className="p-2 text-destructive hover:text-destructive/80"><Trash2 className="w-4 h-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminRoomManager;
