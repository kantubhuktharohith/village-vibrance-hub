import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Check, X, Trash2, MapPin, Edit2, Shield, ArrowLeft, UtensilsCrossed, BedDouble, Calculator } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useAdminCheck } from "@/hooks/useAdminCheck";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import AdminFoodManager from "@/components/admin/AdminFoodManager";
import AdminRoomManager from "@/components/admin/AdminRoomManager";
import AdminBudgetManager from "@/components/admin/AdminBudgetManager";

interface TouristPlace {
  id: string;
  name: string;
  region: string;
  description: string;
  image_url: string;
  lat: number;
  lng: number;
  starting_price: number;
  highlights: string[];
  verified: boolean;
  created_at: string;
}

const AdminPage = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdminCheck();
  const { toast } = useToast();

  const [places, setPlaces] = useState<TouristPlace[]>([]);
  const [loadingPlaces, setLoadingPlaces] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "", region: "", description: "", image_url: "", lat: "", lng: "", starting_price: "", highlights: "",
  });

  const fetchPlaces = async () => {
    const { data, error } = await supabase.from("tourist_places").select("*").order("created_at", { ascending: false });
    if (!error && data) setPlaces(data as TouristPlace[]);
    setLoadingPlaces(false);
  };

  useEffect(() => { if (isAdmin) fetchPlaces(); }, [isAdmin]);

  if (authLoading || adminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6 text-center">
        <Shield className="w-16 h-16 text-destructive mb-4" />
        <h1 className="font-display text-2xl font-bold mb-2">Access Denied</h1>
        <p className="text-muted-foreground mb-6">This page is restricted to administrators only.</p>
        <Button onClick={() => navigate("/explore")} variant="outline">Back to Explore</Button>
      </div>
    );
  }

  const resetForm = () => {
    setForm({ name: "", region: "", description: "", image_url: "", lat: "", lng: "", starting_price: "", highlights: "" });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async () => {
    if (!form.name || !form.region) {
      toast({ title: "Error", description: "Name and region are required", variant: "destructive" });
      return;
    }
    const payload = {
      name: form.name, region: form.region, description: form.description, image_url: form.image_url,
      lat: parseFloat(form.lat) || 0, lng: parseFloat(form.lng) || 0,
      starting_price: parseInt(form.starting_price) || 0,
      highlights: form.highlights.split(",").map((h) => h.trim()).filter(Boolean),
      created_by: user.id,
    };

    if (editingId) {
      const { error } = await supabase.from("tourist_places").update(payload).eq("id", editingId);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Updated", description: "Tourist place updated successfully" });
    } else {
      const { error } = await supabase.from("tourist_places").insert(payload);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Added", description: "New tourist place added successfully" });
    }
    resetForm();
    fetchPlaces();
  };

  const handleEdit = (place: TouristPlace) => {
    setForm({
      name: place.name, region: place.region, description: place.description, image_url: place.image_url,
      lat: String(place.lat), lng: String(place.lng), starting_price: String(place.starting_price),
      highlights: place.highlights.join(", "),
    });
    setEditingId(place.id);
    setShowForm(true);
  };

  const handleVerify = async (id: string, verified: boolean) => {
    const { error } = await supabase.from("tourist_places").update({ verified }).eq("id", id);
    if (!error) { toast({ title: verified ? "Verified" : "Unverified" }); fetchPlaces(); }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("tourist_places").delete().eq("id", id);
    if (!error) { toast({ title: "Deleted" }); fetchPlaces(); }
  };

  const placesList = places.map((p) => ({ id: p.id, name: p.name }));

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="flex items-center gap-3 px-5 py-4">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center">
            <ArrowLeft className="w-4.5 h-4.5" />
          </button>
          <div className="flex-1">
            <h1 className="font-display text-xl font-bold">Admin Panel</h1>
            <p className="text-xs text-muted-foreground">Manage places, food & rooms</p>
          </div>
        </div>
      </div>

      <div className="px-5 py-4">
        <Tabs defaultValue="places" className="space-y-4">
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="places" className="text-xs gap-1"><MapPin className="w-3.5 h-3.5" /> Places</TabsTrigger>
            <TabsTrigger value="food" className="text-xs gap-1"><UtensilsCrossed className="w-3.5 h-3.5" /> Food</TabsTrigger>
            <TabsTrigger value="rooms" className="text-xs gap-1"><BedDouble className="w-3.5 h-3.5" /> Rooms</TabsTrigger>
            <TabsTrigger value="budget" className="text-xs gap-1"><Calculator className="w-3.5 h-3.5" /> Budget</TabsTrigger>
          </TabsList>

          <TabsContent value="places" className="space-y-4">
            <div className="flex justify-end">
              <Button size="sm" onClick={() => { resetForm(); setShowForm(true); }} className="gap-1.5">
                <Plus className="w-4 h-4" /> Add Place
              </Button>
            </div>

            <AnimatePresence>
              {showForm && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                  <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
                    <h3 className="font-display text-lg font-semibold">{editingId ? "Edit Place" : "Add New Place"}</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <Input placeholder="Place name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                      <Input placeholder="Region *" value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })} />
                    </div>
                    <Textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                    <Input placeholder="Image URL" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
                    <div className="grid grid-cols-3 gap-3">
                      <Input placeholder="Latitude" type="number" value={form.lat} onChange={(e) => setForm({ ...form, lat: e.target.value })} />
                      <Input placeholder="Longitude" type="number" value={form.lng} onChange={(e) => setForm({ ...form, lng: e.target.value })} />
                      <Input placeholder="Price ₹" type="number" value={form.starting_price} onChange={(e) => setForm({ ...form, starting_price: e.target.value })} />
                    </div>
                    <Input placeholder="Highlights (comma separated)" value={form.highlights} onChange={(e) => setForm({ ...form, highlights: e.target.value })} />
                    <div className="flex gap-3">
                      <Button onClick={handleSubmit} className="flex-1">{editingId ? "Update" : "Add Place"}</Button>
                      <Button variant="outline" onClick={resetForm}>Cancel</Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-border bg-card p-4 text-center">
                <p className="text-2xl font-bold text-primary">{places.length}</p>
                <p className="text-xs text-muted-foreground">Total</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-4 text-center">
                <p className="text-2xl font-bold text-accent">{places.filter((p) => p.verified).length}</p>
                <p className="text-xs text-muted-foreground">Verified</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-4 text-center">
                <p className="text-2xl font-bold text-destructive">{places.filter((p) => !p.verified).length}</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </div>

            {loadingPlaces ? (
              <div className="flex justify-center py-12">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : places.length === 0 ? (
              <div className="text-center py-12">
                <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No tourist places yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {places.map((place) => (
                  <motion.div key={place.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-border bg-card overflow-hidden">
                    <div className="flex gap-4 p-4">
                      {place.image_url ? (
                        <img src={place.image_url} alt={place.name} className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
                      ) : (
                        <div className="w-20 h-20 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-6 h-6 text-muted-foreground" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-display font-semibold text-sm truncate">{place.name}</h4>
                            <p className="text-xs text-muted-foreground">{place.region}</p>
                          </div>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${place.verified ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"}`}>
                            {place.verified ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                            {place.verified ? "Verified" : "Pending"}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{place.description}</p>
                        {place.starting_price > 0 && <p className="text-xs font-semibold mt-1">From ₹{place.starting_price}</p>}
                      </div>
                    </div>
                    <div className="flex border-t border-border">
                      <button onClick={() => handleEdit(place)} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-muted-foreground hover:bg-secondary transition-colors">
                        <Edit2 className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button onClick={() => handleVerify(place.id, !place.verified)} className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-colors border-x border-border ${place.verified ? "text-destructive hover:bg-destructive/5" : "text-primary hover:bg-primary/5"}`}>
                        {place.verified ? <><X className="w-3.5 h-3.5" /> Unverify</> : <><Check className="w-3.5 h-3.5" /> Verify</>}
                      </button>
                      <button onClick={() => handleDelete(place.id)} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-destructive hover:bg-destructive/5 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="food">
            <AdminFoodManager places={placesList} userId={user.id} />
          </TabsContent>

          <TabsContent value="rooms">
            <AdminRoomManager places={placesList} userId={user.id} />
          </TabsContent>

          <TabsContent value="budget">
            <AdminBudgetManager places={placesList} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPage;
