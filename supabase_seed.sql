-- Supabase Seed Data for ResQ - Emergency Contact Directory

-- Seed Categories
INSERT INTO categories (id, name, description, icon) VALUES
('cat_medical', 'Medical', 'Hospitals and ambulance dispatch', 'medical_services'),
('cat_rescue', 'Rescue', 'Disaster relief & SAR units', 'shield_with_heart'),
('cat_shelter', 'Shelter', 'Safe night havens & camps', 'night_shelter'),
('cat_food_water', 'Food & Water', 'Potable water & dry rations', 'water_drop'),
('cat_govt_help', 'Government Helpline', 'Official state disaster desks', 'account_balance'),
('cat_ngo', 'NGO', 'Civil volunteer networks', 'volunteer_activism')
ON CONFLICT (id) DO NOTHING;

-- Seed Regions
INSERT INTO regions (id, name, state, country) VALUES
('reg_mumbai', 'Mumbai', 'Maharashtra', 'India'),
('reg_pune', 'Pune', 'Maharashtra', 'India'),
('reg_chennai', 'Chennai', 'Tamil Nadu', 'India'),
('reg_kolkata', 'Kolkata', 'West Bengal', 'India'),
('reg_ahmedabad', 'Ahmedabad', 'Gujarat', 'India')
ON CONFLICT (id) DO NOTHING;

-- Seed Listings
-- Medical (3 listings)
INSERT INTO listings (id, name, category_id, region_id, phone, toll_free, address, operating_hours, status, description, latitude, longitude) VALUES
(
  'a1000000-0000-0000-0000-000000000001',
  'Emergency Medical Services - KEM Hospital',
  'cat_medical',
  'reg_mumbai',
  '+91 22 2410 0000',
  '108',
  'Civic Hospital Campus, Dr. E. Borges Road, Parel, Mumbai, Maharashtra 400012',
  '24 Hours / 7 Days a week',
  'active',
  'Rapid trauma ambulance response, ICU resuscitation beds, and emergency triage for flood and injury victims.',
  19.0028,
  72.8423
),
(
  'a1000000-0000-0000-0000-000000000002',
  'Sassoon General Hospital Emergency Ward',
  'cat_medical',
  'reg_pune',
  '+91 20 2612 8000',
  '108',
  'Station Road, Near Pune Railway Station, Pune, Maharashtra 411001',
  '24 Hours / 7 Days a week',
  'active',
  'State-run regional trauma center equipped with emergency surgical theatres and flood medical rescue dispatch.',
  18.5284,
  73.8739
),
(
  'a1000000-0000-0000-0000-000000000003',
  'Rajiv Gandhi Government General Hospital Trauma Care',
  'cat_medical',
  'reg_chennai',
  '+91 44 2530 5000',
  '108',
  'EVR Periyar Salai, Park Town, Chennai, Tamil Nadu 600003',
  '24 Hours / 7 Days a week',
  'active',
  'Premier emergency healthcare facility with flood-resistant power backup and 100+ critical care beds.',
  13.0805,
  80.2778
),

-- Rescue (2 listings)
(
  'b1000000-0000-0000-0000-000000000001',
  'Flood & Disaster Rescue Helpline (SDRF)',
  'cat_rescue',
  'reg_mumbai',
  '+91 22 2269 4725',
  '1077',
  'State Disaster Command HQ, Fort District, Mumbai, Maharashtra 400001',
  'Immediate 24-Hour Deployment',
  'active',
  'Specialized amphibious boats, structural collapse recovery, swift water rescue teams, and coastal evacuation squads.',
  18.9322,
  72.8354
),
(
  'b1000000-0000-0000-0000-000000000002',
  'National Disaster Response Force (NDRF 5th Bn)',
  'cat_rescue',
  'reg_pune',
  '+91 20 2710 3300',
  '1070',
  'Sudumbare Campus, Talegaon-Chakan Road, Maval, Pune 410507',
  '24 Hours / 7 Days a week',
  'active',
  'Federal specialized disaster response battalion specializing in deep water navigation, landslide evacuation, and relief logistics.',
  18.7232,
  73.7121
),

-- Shelter (2 listings)
(
  'c1000000-0000-0000-0000-000000000001',
  'Disaster Emergency Shelter - Central Dadar',
  'cat_shelter',
  'reg_mumbai',
  '+91 1800 220 110',
  '9820114455',
  'Municipal Community Complex, Senapati Bapat Marg, Dadar West, Mumbai 400028',
  'Always open during emergencies',
  'active',
  'Temporary secure lodging, warm meals, clean bedding (180 beds capacity), sanitary facilities, and emergency power generator.',
  19.0178,
  72.8432
),
(
  'c1000000-0000-0000-0000-000000000002',
  'Kolkata Municipal Corporation Flood Shelter',
  'cat_shelter',
  'reg_kolkata',
  '+91 33 2286 1212',
  '18003453375',
  '5, S.N. Banerjee Road, Taltala, Kolkata, West Bengal 700013',
  '24 Hours / 7 Days a week',
  'active',
  'Elevated flood relief haven with dry floor accommodation, child care area, and standby paramedic station.',
  22.5601,
  88.3524
),

-- Food & Water (2 listings)
(
  'd1000000-0000-0000-0000-000000000001',
  'Bandra Emergency Water & Ration Distribution Hub',
  'cat_food_water',
  'reg_mumbai',
  '+91 22 2642 5050',
  '1916',
  'Ward H/West Civic Depot, St. Martin Road, Bandra West, Mumbai 400050',
  '06:00 AM - 10:00 PM (Emergency 24h)',
  'active',
  'Municipal potable water tankers, sealed water pouches, nutrient dry ration kits, and baby food distribution.',
  19.0596,
  72.8295
),
(
  'd1000000-0000-0000-0000-000000000002',
  'Ahmedabad Relief Kitchen & Water Depots',
  'cat_food_water',
  'reg_ahmedabad',
  '+91 79 2539 1811',
  '155303',
  'Sardar Patel Bhavan, Danapith, Ahmedabad, Gujarat 380001',
  '24 Hours during severe waterlogging',
  'active',
  'Mass community kitchen producing hot dry meals, purified water refilling stations, and distribution to submerged low-lying areas.',
  23.0225,
  72.5872
),

-- Government Helpline (2 listings)
(
  'e1000000-0000-0000-0000-000000000001',
  'State Disaster Management Authority (SDMA Cell)',
  'cat_govt_help',
  'reg_mumbai',
  '+91 22 2202 7990',
  '112',
  'Mantralaya Disaster Cell, Madame Cama Road, Nariman Point, Mumbai 400032',
  'Continuous 24/7 Monitoring',
  'active',
  'Single unified government emergency desk coordinating police, fire service, SDRF, maritime patrol, and hospital admissions.',
  18.9272,
  72.8267
),
(
  'e1000000-0000-0000-0000-000000000002',
  'West Bengal Disaster Management Department Control Room',
  'cat_govt_help',
  'reg_kolkata',
  '+91 33 2214 3526',
  '1070',
  'Nabanna, 325 Sarat Chatterjee Road, Mandirtala, Shibpur, Kolkata 711102',
  '24 Hours / 7 Days a week',
  'active',
  'Central command desk for meteorological weather warnings, dam water discharge alerts, and district magistrate relief operations.',
  22.5647,
  88.3243
),

-- NGO (2 listings)
(
  'f1000000-0000-0000-0000-000000000001',
  'Goonj Disaster Relief & Rehabilitation Support',
  'cat_ngo',
  'reg_mumbai',
  '+91 22 2845 3034',
  '9321550990',
  'Unit 3, Famous Studio Lane, Mahalaxmi, Mumbai, Maharashtra 400011',
  '08:00 AM - 08:00 PM',
  'active',
  'Essential family survival kits (cloth, tarpaulins, dry rations, sanitary napkins) and community rehabilitation drives in flood zones.',
  18.9886,
  72.8265
),
(
  'f1000000-0000-0000-0000-000000000002',
  'SEEDS India Emergency Disaster Wardens',
  'cat_ngo',
  'reg_chennai',
  '+91 44 4210 9980',
  '18001024343',
  'First Seaward Road, Valmiki Nagar, Thiruvanmiyur, Chennai 600041',
  '24 Hours Response Line',
  'active',
  'Community-led volunteer emergency wardens providing water disinfection tablets, inflatable rescue dinghies, and shelter assistance.',
  12.9830,
  80.2594
)
ON CONFLICT (id) DO NOTHING;
