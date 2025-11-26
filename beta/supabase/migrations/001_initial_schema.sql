-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- User profiles and authentication
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  api_key TEXT, -- Encrypted user API key
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'premium')),
  last_sync TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Global market data (shared across all users)
CREATE TABLE market_prices (
  id SERIAL PRIMARY KEY,
  item_id INTEGER NOT NULL,
  item_name TEXT NOT NULL,
  ki_price BIGINT,
  price BIGINT,
  unix_timestamp BIGINT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(item_id, unix_timestamp)
);

-- Game reference data
CREATE TABLE game_items (
  id SERIAL PRIMARY KEY,
  item_id INTEGER UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- 'factory', 'building', 'unit', 'resource', etc.
  data JSONB, -- Store detailed item information
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Luxury auctions
CREATE TABLE luxury_auctions (
  id SERIAL PRIMARY KEY,
  item_id INTEGER NOT NULL,
  current_bid BIGINT,
  bidder_id UUID REFERENCES profiles(id),
  end_time BIGINT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User-specific game data
CREATE TABLE user_factories (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  factory_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  level INTEGER DEFAULT 1,
  strike_status TEXT DEFAULT 'no',
  last_sync TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, factory_id)
);

CREATE TABLE user_warehouses (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  warehouse_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  credits BIGINT DEFAULT 0,
  capacity INTEGER DEFAULT 1000,
  used INTEGER DEFAULT 0,
  UNIQUE(user_id, warehouse_id)
);

CREATE TABLE user_mines (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  mine_type TEXT NOT NULL,
  level INTEGER DEFAULT 1,
  production_rate DECIMAL(10,2),
  last_sync TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE user_special_buildings (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  building_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  level INTEGER DEFAULT 1,
  last_sync TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, building_id)
);

CREATE TABLE user_headquarters (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  progress_level INTEGER DEFAULT 1,
  current_xp BIGINT DEFAULT 0,
  last_sync TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE user_trade_logs (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  trade_data JSONB, -- Store complete trade information
  trade_date TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE user_attack_logs (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  attack_data JSONB,
  attack_date TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE user_missions (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  mission_data JSONB,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE user_maintenance_logs (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  log_data JSONB,
  log_date TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE user_achievements (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  achievement_data JSONB,
  unlocked_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE user_monetary_items (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  item_data JSONB,
  last_sync TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_market_prices_item_id ON market_prices(item_id);
CREATE INDEX idx_market_prices_timestamp ON market_prices(unix_timestamp DESC);
CREATE INDEX idx_game_items_category ON game_items(category);
CREATE INDEX idx_user_factories_user_id ON user_factories(user_id);
CREATE INDEX idx_user_warehouses_user_id ON user_warehouses(user_id);
CREATE INDEX idx_user_mines_user_id ON user_mines(user_id);
CREATE INDEX idx_user_special_buildings_user_id ON user_special_buildings(user_id);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE luxury_auctions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_factories ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_warehouses ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_mines ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_special_buildings ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_headquarters ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_trade_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_attack_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_missions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_maintenance_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_monetary_items ENABLE ROW LEVEL SECURITY;

-- Row Level Security Policies

-- Global data - accessible to all authenticated users
CREATE POLICY "Allow authenticated users to read global data" ON market_prices
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to read game items" ON game_items
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to read luxury auctions" ON luxury_auctions
  FOR SELECT USING (auth.role() = 'authenticated');

-- User profiles - users can manage their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- User-specific data - users can only access their own data
CREATE POLICY "Users can only access their own factories" ON user_factories
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can only access their own warehouses" ON user_warehouses
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can only access their own mines" ON user_mines
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can only access their own special buildings" ON user_special_buildings
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can only access their own headquarters" ON user_headquarters
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can only access their own trade logs" ON user_trade_logs
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can only access their own attack logs" ON user_attack_logs
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can only access their own missions" ON user_missions
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can only access their own maintenance logs" ON user_maintenance_logs
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can only access their own achievements" ON user_achievements
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can only access their own monetary items" ON user_monetary_items
  FOR ALL USING (auth.uid() = user_id);

-- Create function to handle user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (new.id, new.raw_user_meta_data->>'username');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger AS $$
BEGIN
  new.updated_at = NOW();
  RETURN new;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER handle_updated_at_profiles
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();