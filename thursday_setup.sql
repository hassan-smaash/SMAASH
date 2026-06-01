-- ============================================================
-- SMAASH THURSDAY SETUP SQL
-- Run ALL of this in Supabase SQL Editor at once
-- ============================================================

-- 1. Add missing columns to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS plays_singles boolean DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS bio text DEFAULT '';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS location text DEFAULT '';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS gender text DEFAULT '';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS dob text DEFAULT '';

-- 2. Add missing columns to matches  
ALTER TABLE public.matches ADD COLUMN IF NOT EXISTS rating_change_a integer DEFAULT 0;
ALTER TABLE public.matches ADD COLUMN IF NOT EXISTS rating_change_b integer DEFAULT 0;

-- 3. Create reactions table
CREATE TABLE IF NOT EXISTS public.reactions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  match_id uuid REFERENCES public.matches(id) ON DELETE CASCADE,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  emoji text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(match_id, user_id)
);
ALTER TABLE public.reactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read reactions" ON public.reactions FOR SELECT USING (true);
CREATE POLICY "Auth write reactions" ON public.reactions FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 4. Create comments table
CREATE TABLE IF NOT EXISTS public.comments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  match_id uuid REFERENCES public.matches(id) ON DELETE CASCADE,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  text text NOT NULL,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read comments" ON public.comments FOR SELECT USING (true);
CREATE POLICY "Auth write comments" ON public.comments FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 5. Create follows table
CREATE TABLE IF NOT EXISTS public.follows (
  follower_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  following_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (follower_id, following_id)
);
ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read follows" ON public.follows FOR SELECT USING (true);
CREATE POLICY "Auth write follows" ON public.follows FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 6. Clubs table
CREATE TABLE IF NOT EXISTS public.clubs (
  id text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name text NOT NULL,
  status text DEFAULT 'pending',
  location text,
  logo text,
  logo_color text DEFAULT '#22d3ee',
  director_name text,
  director_email text,
  courts integer DEFAULT 0,
  court_surface text,
  facilities jsonb DEFAULT '[]',
  founded text,
  description text,
  member_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.clubs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read clubs" ON public.clubs FOR SELECT USING (true);
CREATE POLICY "Auth write clubs" ON public.clubs FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 7. Fix RLS on profiles
DROP POLICY IF EXISTS "Allow authenticated reads" ON public.profiles;
CREATE POLICY "Allow authenticated reads" ON public.profiles FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "Allow self update" ON public.profiles;
CREATE POLICY "Allow self update" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- 8. Rating trigger
CREATE OR REPLACE FUNCTION calculate_match_ratings()
RETURNS TRIGGER AS $$
DECLARE
  sets_data JSONB; total_a NUMERIC := 0; total_b NUMERIC := 0;
  total_pts NUMERIC; margin_ratio NUMERIC; margin_mult NUMERIC;
  sets_won_a INTEGER := 0; sets_won_b INTEGER := 0;
  set_dom NUMERIC; set_mult NUMERIC; final_mult NUMERIC;
  K NUMERIC := 25; r_a NUMERIC; r_b NUMERIC;
  expected_a NUMERIC; change_a NUMERIC; change_b NUMERIC;
  club_a TEXT; club_b TEXT; s JSONB;
BEGIN
  IF NEW.status NOT IN ('confirmed','auto_confirmed') THEN RETURN NEW; END IF;
  IF OLD.status IN ('confirmed','auto_confirmed') THEN RETURN NEW; END IF;
  sets_data := NEW.sets;
  FOR s IN SELECT * FROM jsonb_array_elements(sets_data) LOOP
    total_a := total_a + (s->>'a')::NUMERIC;
    total_b := total_b + (s->>'b')::NUMERIC;
    IF (s->>'a')::NUMERIC > (s->>'b')::NUMERIC THEN sets_won_a := sets_won_a + 1;
    ELSE sets_won_b := sets_won_b + 1; END IF;
  END LOOP;
  total_pts := GREATEST(total_a + total_b, 1);
  margin_ratio := ABS(total_a - total_b) / total_pts;
  margin_mult := 0.8 + (margin_ratio * 1.4);
  set_dom := ABS(sets_won_a - sets_won_b)::NUMERIC / GREATEST(sets_won_a + sets_won_b, 1);
  set_mult := 1.0 + (set_dom * 0.3);
  final_mult := LEAST(margin_mult * set_mult, 2.0);
  SELECT club_id::TEXT INTO club_a FROM public.profiles WHERE id = NEW.player_a_id;
  SELECT club_id::TEXT INTO club_b FROM public.profiles WHERE id = NEW.player_b_id;
  IF club_a IS NOT NULL AND club_b IS NOT NULL AND club_a != club_b THEN
    final_mult := final_mult * 1.3;
  END IF;
  K := CASE NEW.tier WHEN 1 THEN 25 WHEN 2 THEN 40 WHEN 3 THEN 60 WHEN 4 THEN 80 ELSE 100 END;
  SELECT COALESCE(doubles_rating, 500) INTO r_a FROM public.profiles WHERE id = NEW.player_a_id;
  SELECT COALESCE(doubles_rating, 500) INTO r_b FROM public.profiles WHERE id = NEW.player_b_id;
  expected_a := 1.0 / (1.0 + POWER(10.0, (r_b - r_a) / 400.0));
  change_a := ROUND(K * final_mult * (1.0 - expected_a));
  change_b := ROUND(K * final_mult * (0.0 - (1.0 - expected_a)));
  NEW.rating_change_a := change_a::INTEGER;
  NEW.rating_change_b := change_b::INTEGER;
  UPDATE public.profiles SET doubles_rating = GREATEST(100, LEAST(2500, doubles_rating + change_a)) WHERE id = NEW.player_a_id;
  UPDATE public.profiles SET doubles_rating = GREATEST(100, LEAST(2500, doubles_rating + change_b)) WHERE id = NEW.player_b_id;
  IF NEW.partner_a_id IS NOT NULL THEN
    UPDATE public.profiles SET doubles_rating = GREATEST(100, LEAST(2500, doubles_rating + change_a)) WHERE id = NEW.partner_a_id;
  END IF;
  IF NEW.partner_b_id IS NOT NULL THEN
    UPDATE public.profiles SET doubles_rating = GREATEST(100, LEAST(2500, doubles_rating + change_b)) WHERE id = NEW.partner_b_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_match_confirmed ON public.matches;
CREATE TRIGGER on_match_confirmed
  BEFORE UPDATE ON public.matches
  FOR EACH ROW EXECUTE FUNCTION calculate_match_ratings();

-- 9. Fix the 7 pilot players ratings
UPDATE public.profiles SET doubles_rating = 574 WHERE id::text LIKE '460f619c%';
UPDATE public.profiles SET doubles_rating = 565 WHERE id::text LIKE 'b0bc8a87%';
UPDATE public.profiles SET doubles_rating = 542 WHERE id::text LIKE '469814bc%';
UPDATE public.profiles SET doubles_rating = 473 WHERE id::text LIKE '869cafcc%';
UPDATE public.profiles SET doubles_rating = 467 WHERE id::text LIKE 'fddba945%';
UPDATE public.profiles SET doubles_rating = 462 WHERE id::text LIKE '04b9ec37%';
UPDATE public.profiles SET doubles_rating = 417 WHERE id::text LIKE 'c68fa992%';

-- 10. Reset singles ratings (all matches were doubles)
UPDATE public.profiles SET singles_rating = 500;
