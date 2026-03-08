
CREATE TABLE public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  review_type text NOT NULL CHECK (review_type IN ('place', 'food', 'room')),
  target_id uuid NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, review_type, target_id)
);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Anyone can read reviews
CREATE POLICY "Anyone can view reviews" ON public.reviews FOR SELECT USING (true);

-- Authenticated users can insert their own reviews
CREATE POLICY "Users can insert own reviews" ON public.reviews FOR INSERT 
  TO authenticated WITH CHECK (auth.uid() = user_id);

-- Users can update their own reviews
CREATE POLICY "Users can update own reviews" ON public.reviews FOR UPDATE 
  TO authenticated USING (auth.uid() = user_id);

-- Users can delete their own reviews
CREATE POLICY "Users can delete own reviews" ON public.reviews FOR DELETE 
  TO authenticated USING (auth.uid() = user_id);

-- Create index for fast lookups
CREATE INDEX idx_reviews_target ON public.reviews (review_type, target_id);
CREATE INDEX idx_reviews_user ON public.reviews (user_id);
