
-- 1. Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- 2. Create user_roles table
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 3. Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- 4. RLS on user_roles
CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- 5. Tourist places table
CREATE TABLE public.tourist_places (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  region text NOT NULL,
  description text NOT NULL DEFAULT '',
  image_url text DEFAULT '',
  lat double precision NOT NULL DEFAULT 0,
  lng double precision NOT NULL DEFAULT 0,
  starting_price integer NOT NULL DEFAULT 0,
  highlights text[] DEFAULT '{}',
  verified boolean NOT NULL DEFAULT false,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.tourist_places ENABLE ROW LEVEL SECURITY;

-- 6. RLS policies for tourist_places
CREATE POLICY "Anyone can view verified places" ON public.tourist_places
  FOR SELECT USING (verified = true);

CREATE POLICY "Admins can view all places" ON public.tourist_places
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert places" ON public.tourist_places
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update places" ON public.tourist_places
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete places" ON public.tourist_places
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 7. Updated_at trigger for tourist_places
CREATE TRIGGER update_tourist_places_updated_at
  BEFORE UPDATE ON public.tourist_places
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
