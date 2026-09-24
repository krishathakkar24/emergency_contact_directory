-- Supabase Database Schema for ResQ - Emergency Contact Directory
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table with 3 roles: 'Public User', 'Contributor', 'Admin'
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'Contributor' CHECK (role IN ('Public User', 'Contributor', 'Admin')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Regions Table
CREATE TABLE IF NOT EXISTS regions (
  id TEXT PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  state TEXT NOT NULL,
  country TEXT DEFAULT 'India',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Listings Table (Public Emergency Directory)
CREATE TABLE IF NOT EXISTS listings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  category_id TEXT REFERENCES categories(id) ON DELETE SET NULL,
  region_id TEXT REFERENCES regions(id) ON DELETE SET NULL,
  phone TEXT NOT NULL,
  toll_free TEXT,
  address TEXT NOT NULL,
  operating_hours TEXT DEFAULT '24 Hours / 7 Days a week',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'unverified', 'inactive')),
  description TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Submissions Table (for emergency resource submissions)
CREATE TABLE IF NOT EXISTS submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  submitted_by TEXT,
  resource_name TEXT NOT NULL,
  category TEXT NOT NULL,
  region TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  operating_hours TEXT,
  description TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Reports Table (for reporting incorrect information)
CREATE TABLE IF NOT EXISTS reports (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  listing_id UUID REFERENCES listings(id) ON DELETE CASCADE,
  reason TEXT NOT NULL CHECK (reason IN ('Wrong phone number', 'Wrong address', 'Service unavailable', 'Other')),
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE regions ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- ROW LEVEL SECURITY POLICIES
-- ==========================================

-- Public Users:
-- Can read active listings, categories, and regions
CREATE POLICY "Public listings are viewable by everyone" ON listings FOR SELECT USING (status = 'active');
CREATE POLICY "Categories are viewable by everyone" ON categories FOR SELECT USING (true);
CREATE POLICY "Regions are viewable by everyone" ON regions FOR SELECT USING (true);

-- Contributors:
-- Can create submissions
CREATE POLICY "Contributors can submit resources" ON submissions FOR INSERT WITH CHECK (
  auth.role() = 'authenticated'
);

-- Contributors can only view their own submissions
CREATE POLICY "Contributors can view their own submissions" ON submissions FOR SELECT USING (
  auth.uid()::text = submitted_by OR auth.jwt() ->> 'email' = submitted_by
);

-- Anyone can report incorrect listings
CREATE POLICY "Anyone can report incorrect listings" ON reports FOR INSERT WITH CHECK (true);

-- Admins:
-- Can view and manage all submissions (approve/reject)
CREATE POLICY "Admins have full access to submissions" ON submissions FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'Admin')
);

-- Admins have full access to listings
CREATE POLICY "Admins have full access to listings" ON listings FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'Admin')
);

-- Admins can view reports
CREATE POLICY "Admins can view reports" ON reports FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'Admin')
);
