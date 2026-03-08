
-- Place foods table
CREATE TABLE public.place_foods (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  place_id uuid REFERENCES public.tourist_places(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  description text DEFAULT '',
  image_url text DEFAULT '',
  price_range text DEFAULT '',
  cuisine_type text DEFAULT '',
  is_vegetarian boolean DEFAULT false,
  rating numeric(2,1) DEFAULT 0,
  created_by uuid DEFAULT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.place_foods ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view foods" ON public.place_foods FOR SELECT USING (true);
CREATE POLICY "Admins can manage foods" ON public.place_foods FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Partners can insert foods" ON public.place_foods FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'partner'));
CREATE POLICY "Partners can update own foods" ON public.place_foods FOR UPDATE USING (auth.uid() = created_by AND public.has_role(auth.uid(), 'partner'));

-- Place rooms table
CREATE TABLE public.place_rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  place_id uuid REFERENCES public.tourist_places(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  description text DEFAULT '',
  image_url text DEFAULT '',
  room_type text DEFAULT 'standard',
  price_per_night integer NOT NULL DEFAULT 0,
  max_guests integer DEFAULT 2,
  amenities text[] DEFAULT '{}',
  rating numeric(2,1) DEFAULT 0,
  total_reviews integer DEFAULT 0,
  available boolean DEFAULT true,
  created_by uuid DEFAULT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.place_rooms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view rooms" ON public.place_rooms FOR SELECT USING (true);
CREATE POLICY "Admins can manage rooms" ON public.place_rooms FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Partners can insert rooms" ON public.place_rooms FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'partner'));
CREATE POLICY "Partners can update own rooms" ON public.place_rooms FOR UPDATE USING (auth.uid() = created_by AND public.has_role(auth.uid(), 'partner'));

-- Budget info table
CREATE TABLE public.place_budget_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  place_id uuid REFERENCES public.tourist_places(id) ON DELETE CASCADE NOT NULL UNIQUE,
  avg_food_cost_per_day integer DEFAULT 0,
  avg_room_cost_per_night integer DEFAULT 0,
  avg_transport_cost_per_day integer DEFAULT 0,
  avg_activity_cost_per_day integer DEFAULT 0,
  currency text DEFAULT 'INR',
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.place_budget_info ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view budget info" ON public.place_budget_info FOR SELECT USING (true);
CREATE POLICY "Admins can manage budget info" ON public.place_budget_info FOR ALL USING (public.has_role(auth.uid(), 'admin'));
