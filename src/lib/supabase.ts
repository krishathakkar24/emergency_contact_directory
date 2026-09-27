import { createClient, SupabaseClient } from '@supabase/supabase-js';
import {
  Category,
  Region,
  Listing,
  Submission,
  Report,
  UserProfile,
  EmergencyCategory,
} from '../types';

// Read from env vars (supports both Vite and Next.js naming conventions)
const envUrl =
  (import.meta.env.VITE_SUPABASE_URL as string) ||
  (import.meta.env.NEXT_PUBLIC_SUPABASE_URL as string) ||
  '';

const envKey =
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string) ||
  (import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string) ||
  '';

// Check if credentials look real and valid
export const isConfigured = Boolean(
  envUrl &&
    envKey &&
    envUrl.startsWith('http') &&
    !envUrl.includes('your-project') &&
    !envKey.includes('your-anon-key')
);

export const supabase: SupabaseClient | null = isConfigured
  ? createClient(envUrl, envKey)
  : null;

// Initial static seed categories
export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat_medical',
    name: 'Medical',
    description: 'Hospitals and ambulance dispatch',
    icon: 'medical_services',
  },
  {
    id: 'cat_rescue',
    name: 'Rescue',
    description: 'Disaster relief & SAR units',
    icon: 'shield_with_heart',
  },
  {
    id: 'cat_shelter',
    name: 'Shelter',
    description: 'Safe night havens & camps',
    icon: 'night_shelter',
  },
  {
    id: 'cat_food_water',
    name: 'Food & Water',
    description: 'Potable water & dry rations',
    icon: 'water_drop',
  },
  {
    id: 'cat_govt_help',
    name: 'Government Helpline',
    description: 'Official state disaster desks',
    icon: 'account_balance',
  },
  {
    id: 'cat_ngo',
    name: 'NGO',
    description: 'Civil volunteer networks',
    icon: 'volunteer_activism',
  },
];

// Initial static seed regions
export const INITIAL_REGIONS: Region[] = [
  { id: 'reg_mumbai', name: 'Mumbai', state: 'Maharashtra', country: 'India' },
  { id: 'reg_pune', name: 'Pune', state: 'Maharashtra', country: 'India' },
  { id: 'reg_chennai', name: 'Chennai', state: 'Tamil Nadu', country: 'India' },
  { id: 'reg_kolkata', name: 'Kolkata', state: 'West Bengal', country: 'India' },
  { id: 'reg_ahmedabad', name: 'Ahmedabad', state: 'Gujarat', country: 'India' },
];

// Initial directory listings: At least 2-3 Medical resources per major region,
// and multiple Rescue, Shelter, Food & Water, Govt Helpline, and NGO resources across all regions.
export const INITIAL_LISTINGS: Listing[] = [
  // ==========================================
  // 1. MUMBAI (reg_mumbai)
  // ==========================================
  // Mumbai - Medical 1
  {
    id: 'med-mum-01',
    name: 'Emergency Medical Services - KEM Hospital',
    category_id: 'cat_medical',
    category_name: 'Medical',
    region_id: 'reg_mumbai',
    region_name: 'Mumbai',
    phone: '+91 22 2410 7000 (Sample Demo Helpline)',
    toll_free: '108 (State Emergency Ambulance)',
    address: 'Civic Hospital Campus, Dr. E. Borges Road, Parel, Mumbai, Maharashtra 400012',
    operating_hours: '24 Hours / 7 Days a week',
    status: 'active',
    description: 'Rapid trauma ambulance response, 24/7 ICU resuscitation beds, blood bank, and emergency triage for flood and injury victims.',
    latitude: 19.0028,
    longitude: 72.8423,
    created_at: new Date().toISOString(),
  },
  // Mumbai - Medical 2
  {
    id: 'med-mum-02',
    name: 'Lokmanya Tilak Municipal General Hospital (Sion Hospital)',
    category_id: 'cat_medical',
    category_name: 'Medical',
    region_id: 'reg_mumbai',
    region_name: 'Mumbai',
    phone: '+91 22 2407 6381 (Sample Demo Helpline)',
    toll_free: '108 (State Emergency Ambulance)',
    address: 'Sion West, Near Sion Railway Station, Mumbai, Maharashtra 400022',
    operating_hours: '24 Hours / 7 Days a week',
    status: 'active',
    description: 'Specialized major trauma center for Central Mumbai and highway casualties, active disaster resuscitation unit with 80 emergency beds.',
    latitude: 19.0368,
    longitude: 72.8601,
    created_at: new Date().toISOString(),
  },
  // Mumbai - Medical 3
  {
    id: 'med-mum-03',
    name: 'Sir J.J. Group of Hospitals - Central Emergency Casualty',
    category_id: 'cat_medical',
    category_name: 'Medical',
    region_id: 'reg_mumbai',
    region_name: 'Mumbai',
    phone: '+91 22 2373 5555 (Sample Demo Helpline)',
    toll_free: '108 (State Emergency Ambulance)',
    address: 'J.J. Marg, Nagpada, Byculla, Mumbai, Maharashtra 400008',
    operating_hours: '24 Hours / 7 Days a week',
    status: 'active',
    description: 'State tertiary referral hospital with advanced cardiac resuscitation, burn emergency unit, and standby flood disaster medical squad.',
    latitude: 18.9633,
    longitude: 72.8339,
    created_at: new Date().toISOString(),
  },
  // Mumbai - Rescue 1
  {
    id: 'resc-mum-01',
    name: 'Flood & Disaster Rescue Helpline (SDRF Mumbai Unit)',
    category_id: 'cat_rescue',
    category_name: 'Rescue',
    region_id: 'reg_mumbai',
    region_name: 'Mumbai',
    phone: '+91 22 2269 4725 (Sample Demo Helpline)',
    toll_free: '1077 (Disaster Desk)',
    address: 'State Disaster Command HQ, Fort District, Mumbai, Maharashtra 400001',
    operating_hours: 'Immediate 24-Hour Deployment',
    status: 'active',
    description: 'Specialized amphibious boats, structural collapse recovery, swift water rescue teams, and coastal evacuation squads.',
    latitude: 18.9322,
    longitude: 72.8354,
    created_at: new Date().toISOString(),
  },
  // Mumbai - Rescue 2
  {
    id: 'resc-mum-02',
    name: 'Mumbai Fire Brigade Central Emergency Search & Rescue',
    category_id: 'cat_rescue',
    category_name: 'Rescue',
    region_id: 'reg_mumbai',
    region_name: 'Mumbai',
    phone: '+91 22 2307 6111 (Sample Demo Helpline)',
    toll_free: '101 (Fire & Emergency Rescue)',
    address: 'Command Control Centre, Byculla Fire Station, Byculla, Mumbai 400008',
    operating_hours: '24 Hours / 7 Days a week',
    status: 'active',
    description: 'High-reach hydraulic ladders, urban search and rescue (USAR) canines, waterlogging dewatering pumps, and fire-fighting tenders.',
    latitude: 18.9744,
    longitude: 72.8315,
    created_at: new Date().toISOString(),
  },
  // Mumbai - Shelter 1
  {
    id: 'shelt-mum-01',
    name: 'Disaster Emergency Shelter - Central Dadar',
    category_id: 'cat_shelter',
    category_name: 'Shelter',
    region_id: 'reg_mumbai',
    region_name: 'Mumbai',
    phone: '+91 1800 220 110 (Sample Demo Helpline)',
    toll_free: '1916 (Disaster Control)',
    address: 'Municipal Community Complex, Senapati Bapat Marg, Dadar West, Mumbai 400028',
    operating_hours: 'Always open during emergencies',
    status: 'active',
    description: 'Temporary secure lodging, warm meals, clean bedding (180 beds capacity), sanitary facilities, and emergency power generator.',
    latitude: 19.0178,
    longitude: 72.8432,
    created_at: new Date().toISOString(),
  },
  // Mumbai - Shelter 2
  {
    id: 'shelt-mum-02',
    name: 'Kurla Flood Evacuation & Transit Shelter',
    category_id: 'cat_shelter',
    category_name: 'Shelter',
    region_id: 'reg_mumbai',
    region_name: 'Mumbai',
    phone: '+91 22 2650 0144 (Sample Demo Helpline)',
    toll_free: '1916 (Disaster Control)',
    address: 'Ward L Municipal School Hall, SG Barve Marg, Kurla West, Mumbai 400070',
    operating_hours: '24 Hours during weather warnings',
    status: 'active',
    description: 'Elevated monsoon evacuation shelter for Mithi River overflow relief, standby paramedics, family sleeping zones, and drinking water.',
    latitude: 19.0688,
    longitude: 72.8791,
    created_at: new Date().toISOString(),
  },
  // Mumbai - Food & Water 1
  {
    id: 'food-mum-01',
    name: 'Bandra Emergency Water & Ration Distribution Hub',
    category_id: 'cat_food_water',
    category_name: 'Food & Water',
    region_id: 'reg_mumbai',
    region_name: 'Mumbai',
    phone: '+91 22 2642 5050 (Sample Demo Helpline)',
    toll_free: '1916 (Civic Desk)',
    address: 'Ward H/West Civic Depot, St. Martin Road, Bandra West, Mumbai 400050',
    operating_hours: '06:00 AM - 10:00 PM (Emergency 24h)',
    status: 'active',
    description: 'Municipal potable water tankers, sealed water pouches, nutrient dry ration kits, and infant milk powder distribution.',
    latitude: 19.0596,
    longitude: 72.8295,
    created_at: new Date().toISOString(),
  },
  // Mumbai - Food & Water 2
  {
    id: 'food-mum-02',
    name: 'Chembur Community Relief Kitchen & Water Depot',
    category_id: 'cat_food_water',
    category_name: 'Food & Water',
    region_id: 'reg_mumbai',
    region_name: 'Mumbai',
    phone: '+91 22 2522 3344 (Sample Demo Helpline)',
    toll_free: '1916 (Civic Desk)',
    address: 'Municipal Maternity & Welfare Ground, Station Road, Chembur East, Mumbai 400071',
    operating_hours: '24 Hours during red monsoon alert',
    status: 'active',
    description: 'Hot meal preparation centers delivering khichdi and bread packets to waterlogged communities along with clean tanker water.',
    latitude: 19.0583,
    longitude: 72.8997,
    created_at: new Date().toISOString(),
  },
  // Mumbai - Govt Help 1
  {
    id: 'govt-mum-01',
    name: 'State Disaster Relief & Helplines (Mantralaya Disaster Cell)',
    category_id: 'cat_govt_help',
    category_name: 'Government Helpline',
    region_id: 'reg_mumbai',
    region_name: 'Mumbai',
    phone: '+91 22 2202 7990 (Sample Demo Helpline)',
    toll_free: '112 (Universal SOS) / 1077',
    address: 'Mantralaya Disaster Cell, Madame Cama Road, Nariman Point, Mumbai 400032',
    operating_hours: 'Continuous 24/7 Monitoring',
    status: 'active',
    description: 'Single unified government emergency desk coordinating police, fire service, SDRF, maritime patrol, and hospital admissions.',
    latitude: 18.9272,
    longitude: 72.8267,
    created_at: new Date().toISOString(),
  },
  // Mumbai - Govt Help 2
  {
    id: 'govt-mum-02',
    name: 'BMC Disaster Management Department Control Room',
    category_id: 'cat_govt_help',
    category_name: 'Government Helpline',
    region_id: 'reg_mumbai',
    region_name: 'Mumbai',
    phone: '+91 22 2269 4727 (Sample Demo Helpline)',
    toll_free: '1916 (BMC Helpline)',
    address: 'BMC Headquarters, Mahapalika Marg, Opp. CSMT, Mumbai 400001',
    operating_hours: '24 Hours / 7 Days a week',
    status: 'active',
    description: 'Monitors 5,000+ CCTV feeds across city flood spots, waterlogging alerts, tree collapse dispatch, and road traffic diversions.',
    latitude: 18.9416,
    longitude: 72.8347,
    created_at: new Date().toISOString(),
  },
  // Mumbai - NGO 1
  {
    id: 'ngo-mum-01',
    name: 'Goonj Disaster Relief & Rehabilitation Support',
    category_id: 'cat_ngo',
    category_name: 'NGO',
    region_id: 'reg_mumbai',
    region_name: 'Mumbai',
    phone: '+91 22 2845 3034 (Sample Demo Helpline)',
    toll_free: '1800 200 4455 (Sample Demo Helpline)',
    address: 'Unit 3, Famous Studio Lane, Mahalaxmi, Mumbai, Maharashtra 400011',
    operating_hours: '08:00 AM - 08:00 PM (Emergency 24h)',
    status: 'active',
    description: 'Essential family survival kits (tarpaulins, dry rations, hygiene kits) and community rehabilitation drives in flood zones.',
    latitude: 18.9886,
    longitude: 72.8265,
    created_at: new Date().toISOString(),
  },
  // Mumbai - NGO 2
  {
    id: 'ngo-mum-02',
    name: 'Habitat for Humanity India Emergency Disaster Relief',
    category_id: 'cat_ngo',
    category_name: 'NGO',
    region_id: 'reg_mumbai',
    region_name: 'Mumbai',
    phone: '+91 22 6784 6868 (Sample Demo Helpline)',
    toll_free: '1800 120 4455 (Sample Demo Helpline)',
    address: '102, Supreme Chambers, 17/18 Shah Industrial Estate, Veera Desai, Andheri West, Mumbai 400053',
    operating_hours: '09:00 AM - 07:00 PM (24h on alert)',
    status: 'active',
    description: 'Emergency temporary shelter repair kits, water filter distributions, and vulnerable family flood resettlement assistance.',
    latitude: 19.1351,
    longitude: 72.8319,
    created_at: new Date().toISOString(),
  },

  // ==========================================
  // 2. PUNE (reg_pune)
  // ==========================================
  // Pune - Medical 1
  {
    id: 'med-pun-01',
    name: 'Sassoon General Hospital Emergency Trauma Ward',
    category_id: 'cat_medical',
    category_name: 'Medical',
    region_id: 'reg_pune',
    region_name: 'Pune',
    phone: '+91 20 2612 8000 (Sample Demo Helpline)',
    toll_free: '108 (State Emergency Ambulance)',
    address: 'Station Road, Near Pune Railway Station, Pune, Maharashtra 411001',
    operating_hours: '24 Hours / 7 Days a week',
    status: 'active',
    description: 'State-run regional trauma center equipped with emergency surgical theatres, burn ICU, and flood medical rescue dispatch.',
    latitude: 18.5284,
    longitude: 73.8739,
    created_at: new Date().toISOString(),
  },
  // Pune - Medical 2
  {
    id: 'med-pun-02',
    name: 'Pune Municipal Corporation Emergency Trauma Care Center',
    category_id: 'cat_medical',
    category_name: 'Medical',
    region_id: 'reg_pune',
    region_name: 'Pune',
    phone: '+91 20 2550 1000 (Sample Demo Helpline)',
    toll_free: '108 (State Emergency Ambulance)',
    address: 'Kamla Nehru Hospital Campus, Mangalwar Peth, Pune, Maharashtra 411011',
    operating_hours: '24 Hours / 7 Days a week',
    status: 'active',
    description: 'Civic emergency hospital with round-the-clock emergency casualty, pediatric ICU, oxygen beds, and disaster response ambulances.',
    latitude: 18.5246,
    longitude: 73.8649,
    created_at: new Date().toISOString(),
  },
  // Pune - Medical 3
  {
    id: 'med-pun-03',
    name: 'Aundh District General Hospital Emergency & Triage Ward',
    category_id: 'cat_medical',
    category_name: 'Medical',
    region_id: 'reg_pune',
    region_name: 'Pune',
    phone: '+91 20 2727 6022 (Sample Demo Helpline)',
    toll_free: '108 (State Emergency Ambulance)',
    address: 'Sangvi Road, Near Shivaji Maharaj Park, Aundh, Pune 411027',
    operating_hours: '24 Hours / 7 Days a week',
    status: 'active',
    description: 'District hospital emergency casualty ward handling urban and highway accident triage, snake bite treatment, and flood medical kits.',
    latitude: 18.5714,
    longitude: 73.8052,
    created_at: new Date().toISOString(),
  },
  // Pune - Rescue 1
  {
    id: 'resc-pun-01',
    name: 'National Disaster Response Force (NDRF 5th Bn)',
    category_id: 'cat_rescue',
    category_name: 'Rescue',
    region_id: 'reg_pune',
    region_name: 'Pune',
    phone: '+91 20 2710 3300 (Sample Demo Helpline)',
    toll_free: '1070 (Disaster Ops)',
    address: 'Sudumbare Campus, Talegaon-Chakan Road, Maval, Pune 410507',
    operating_hours: '24 Hours / 7 Days a week',
    status: 'active',
    description: 'Federal specialized disaster response battalion specializing in deep water navigation, landslide evacuation, and relief logistics.',
    latitude: 18.7232,
    longitude: 73.7121,
    created_at: new Date().toISOString(),
  },
  // Pune - Rescue 2
  {
    id: 'resc-pun-02',
    name: 'Pune Fire Brigade & Swift Water Rescue Squad',
    category_id: 'cat_rescue',
    category_name: 'Rescue',
    region_id: 'reg_pune',
    region_name: 'Pune',
    phone: '+91 20 2645 1707 (Sample Demo Helpline)',
    toll_free: '101 (Fire & Rescue Helpline)',
    address: 'Central Fire Station, New Timber Market, Bhavani Peth, Pune 411042',
    operating_hours: '24 Hours / 7 Days a week',
    status: 'active',
    description: 'Specialized river rescue dinghies for Mutha and Mula river flash floods, animal rescue squad, and chemical hazard containment.',
    latitude: 18.5034,
    longitude: 73.8679,
    created_at: new Date().toISOString(),
  },
  // Pune - Shelter 1
  {
    id: 'shelt-pun-01',
    name: 'Shivajinagar Flood Relief & Night Shelter',
    category_id: 'cat_shelter',
    category_name: 'Shelter',
    region_id: 'reg_pune',
    region_name: 'Pune',
    phone: '+91 20 2550 8200 (Sample Demo Helpline)',
    toll_free: '1800 233 4130',
    address: 'PMC Ward Office Hall, Near Sancheti Hospital, Shivajinagar, Pune 411005',
    operating_hours: 'Always open during emergencies (24/7)',
    status: 'active',
    description: 'Clean temporary accommodation for up to 150 displaced residents, backup diesel generator, hot food kitchen, and medical station.',
    latitude: 18.5314,
    longitude: 73.8446,
    created_at: new Date().toISOString(),
  },
  // Pune - Shelter 2
  {
    id: 'shelt-pun-02',
    name: 'Sinhagad Road Flash Flood Emergency Haven',
    category_id: 'cat_shelter',
    category_name: 'Shelter',
    region_id: 'reg_pune',
    region_name: 'Pune',
    phone: '+91 20 2434 2200 (Sample Demo Helpline)',
    toll_free: '1800 233 4130',
    address: 'Dhayari Community Center, Sinhagad Road, Pune 411041',
    operating_hours: '24 Hours during river discharge warnings',
    status: 'active',
    description: 'Equipped with dry sleeping cots, sanitation facilities, sanitary kits, and warm blanket distribution for riverbank evacuees.',
    latitude: 18.4485,
    longitude: 73.8188,
    created_at: new Date().toISOString(),
  },
  // Pune - Food & Water 1
  {
    id: 'food-pun-01',
    name: 'PMC Emergency Drinking Water Tanker Depot - Swargate',
    category_id: 'cat_food_water',
    category_name: 'Food & Water',
    region_id: 'reg_pune',
    region_name: 'Pune',
    phone: '+91 20 2444 0400 (Sample Demo Helpline)',
    toll_free: '1800 103 0222',
    address: 'Water Works Complex, Near Swargate Bus Station, Pune 411042',
    operating_hours: '24 Hours / 7 Days a week',
    status: 'active',
    description: 'Direct emergency fleet dispatch of 10,000-litre potable drinking water tankers to water-cut and flood-affected housing zones.',
    latitude: 18.5018,
    longitude: 73.8587,
    created_at: new Date().toISOString(),
  },
  // Pune - Food & Water 2
  {
    id: 'food-pun-02',
    name: 'Kothrud Community Food Packet & Ration Center',
    category_id: 'cat_food_water',
    category_name: 'Food & Water',
    region_id: 'reg_pune',
    region_name: 'Pune',
    phone: '+91 20 2543 1188 (Sample Demo Helpline)',
    toll_free: '1800 103 0222',
    address: 'Paud Road Civic Hall, Opposite MIT College, Kothrud, Pune 411038',
    operating_hours: '07:00 AM - 09:00 PM (24h in emergency)',
    status: 'active',
    description: 'Central distribution depot for dry lentils, wheat flour kits, baby nutrition packets, and bottled water for emergency victims.',
    latitude: 18.5074,
    longitude: 73.8077,
    created_at: new Date().toISOString(),
  },
  // Pune - Govt Help 1
  {
    id: 'govt-pun-01',
    name: 'Pune District Collectorate Disaster Control Room',
    category_id: 'cat_govt_help',
    category_name: 'Government Helpline',
    region_id: 'reg_pune',
    region_name: 'Pune',
    phone: '+91 20 2612 3371 (Sample Demo Helpline)',
    toll_free: '1077 (District Disaster Helpline)',
    address: 'Collector Office Building, Camp, Pune, Maharashtra 411001',
    operating_hours: '24 Hours / 7 Days a week',
    status: 'active',
    description: 'District magistrate control cell handling dam release sirens (Khadakwasla Dam alerts), emergency relief grants, and evacuation orders.',
    latitude: 18.5262,
    longitude: 73.8765,
    created_at: new Date().toISOString(),
  },
  // Pune - Govt Help 2
  {
    id: 'govt-pun-02',
    name: 'Pune City Police Central Emergency Response Desk',
    category_id: 'cat_govt_help',
    category_name: 'Government Helpline',
    region_id: 'reg_pune',
    region_name: 'Pune',
    phone: '+91 20 2612 2880 (Sample Demo Helpline)',
    toll_free: '112 (Universal Emergency SOS)',
    address: 'Police Commissioner Office, Sadhu Vaswani Road, Camp, Pune 411001',
    operating_hours: 'Continuous 24/7 Monitoring',
    status: 'active',
    description: 'Immediate police dispatch, missing persons reporting during natural calamities, and emergency green corridor traffic clearing.',
    latitude: 18.5218,
    longitude: 73.8789,
    created_at: new Date().toISOString(),
  },
  // Pune - NGO 1
  {
    id: 'ngo-pun-01',
    name: 'Janwani Civic Volunteer Disaster Response Network',
    category_id: 'cat_ngo',
    category_name: 'NGO',
    region_id: 'reg_pune',
    region_name: 'Pune',
    phone: '+91 20 2570 9000 (Sample Demo Helpline)',
    toll_free: '1800 233 9988 (Sample Demo Helpline)',
    address: 'MCCIA Trade Tower, Senapati Bapat Road, Pune 411016',
    operating_hours: '09:00 AM - 07:00 PM (Emergency 24h)',
    status: 'active',
    description: 'Volunteer community wardens coordinating neighborhood first responders, senior citizen medicine delivery, and relief supply sorting.',
    latitude: 18.5308,
    longitude: 73.8291,
    created_at: new Date().toISOString(),
  },
  // Pune - NGO 2
  {
    id: 'ngo-pun-02',
    name: 'Snehalaya Rapid Community Relief Squad',
    category_id: 'cat_ngo',
    category_name: 'NGO',
    region_id: 'reg_pune',
    region_name: 'Pune',
    phone: '+91 90110 26484 (Sample Demo Helpline)',
    toll_free: '1800 209 1001 (Sample Demo Helpline)',
    address: 'Viman Nagar Disaster Outreach Center, Pune, Maharashtra 411014',
    operating_hours: '24 Hours Emergency Line',
    status: 'active',
    description: 'Emergency maternal and infant disaster aid, warm clothing distribution, and temporary care for children separated during disasters.',
    latitude: 18.5679,
    longitude: 73.9143,
    created_at: new Date().toISOString(),
  },

  // ==========================================
  // 3. CHENNAI (reg_chennai)
  // ==========================================
  // Chennai - Medical 1
  {
    id: 'med-che-01',
    name: 'Rajiv Gandhi Government General Hospital Trauma Care',
    category_id: 'cat_medical',
    category_name: 'Medical',
    region_id: 'reg_chennai',
    region_name: 'Chennai',
    phone: '+91 44 2530 5000 (Sample Demo Helpline)',
    toll_free: '108 (State Emergency Ambulance)',
    address: 'EVR Periyar Salai, Park Town, Chennai, Tamil Nadu 600003',
    operating_hours: '24 Hours / 7 Days a week',
    status: 'active',
    description: 'Premier emergency healthcare facility with flood-resistant power backup, 100+ critical care beds, and advanced trauma surgery units.',
    latitude: 13.0805,
    longitude: 80.2778,
    created_at: new Date().toISOString(),
  },
  // Chennai - Medical 2
  {
    id: 'med-che-02',
    name: 'Government Stanley Hospital Emergency Trauma Center',
    category_id: 'cat_medical',
    category_name: 'Medical',
    region_id: 'reg_chennai',
    region_name: 'Chennai',
    phone: '+91 44 2528 1351 (Sample Demo Helpline)',
    toll_free: '108 (State Emergency Ambulance)',
    address: 'Old Jail Road, Royapuram, Chennai, Tamil Nadu 600001',
    operating_hours: '24 Hours / 7 Days a week',
    status: 'active',
    description: 'North Chennai primary trauma casualty center, specialized burn and reconstructive ward, 24/7 blood bank, and emergency ambulances.',
    latitude: 13.1075,
    longitude: 80.2878,
    created_at: new Date().toISOString(),
  },
  // Chennai - Medical 3
  {
    id: 'med-che-03',
    name: 'Government Kilpauk Medical College Hospital Emergency Unit',
    category_id: 'cat_medical',
    category_name: 'Medical',
    region_id: 'reg_chennai',
    region_name: 'Chennai',
    phone: '+91 44 2836 4951 (Sample Demo Helpline)',
    toll_free: '108 (State Emergency Ambulance)',
    address: 'Poonamallee High Road, Kilpauk, Chennai, Tamil Nadu 600010',
    operating_hours: '24 Hours / 7 Days a week',
    status: 'active',
    description: 'Emergency surgical casualty center with specialized toxicology units, disaster triage bays, and high-water resistant emergency ward.',
    latitude: 13.0827,
    longitude: 80.2435,
    created_at: new Date().toISOString(),
  },
  // Chennai - Rescue 1
  {
    id: 'resc-che-01',
    name: 'Tamil Nadu Fire & Rescue Services (TNFRS) Central Command',
    category_id: 'cat_rescue',
    category_name: 'Rescue',
    region_id: 'reg_chennai',
    region_name: 'Chennai',
    phone: '+91 44 2855 4646 (Sample Demo Helpline)',
    toll_free: '101 (Fire & Disaster Rescue)',
    address: 'No. 12, Rukmani Lakshmipathy Salai, Egmore, Chennai 600008',
    operating_hours: '24 Hours / 7 Days a week',
    status: 'active',
    description: 'Inflatable motorized rubber boats, water pumps for flooded subways, structural building collapse rescue squads, and tree removal cranes.',
    latitude: 13.0732,
    longitude: 80.2609,
    created_at: new Date().toISOString(),
  },
  // Chennai - Rescue 2
  {
    id: 'resc-che-02',
    name: 'Chennai Coastal Swift Water & Beach Rescue Squadron',
    category_id: 'cat_rescue',
    category_name: 'Rescue',
    region_id: 'reg_chennai',
    region_name: 'Chennai',
    phone: '+91 44 2345 2370 (Sample Demo Helpline)',
    toll_free: '1077 (District Disaster Ops)',
    address: 'Marina Beach Command Post, Kamarajar Salai, Triplicane, Chennai 600005',
    operating_hours: 'Immediate 24-Hour Deployment',
    status: 'active',
    description: 'Specialized scuba divers, coastal surf life-saving units, and flood rescue squads covering Adyar and Cooum river overflow basins.',
    latitude: 13.0501,
    longitude: 80.2824,
    created_at: new Date().toISOString(),
  },
  // Chennai - Shelter 1
  {
    id: 'shelt-che-01',
    name: 'Ripon Disaster Relief & Evacuation Shelter',
    category_id: 'cat_shelter',
    category_name: 'Shelter',
    region_id: 'reg_chennai',
    region_name: 'Chennai',
    phone: '+91 44 2561 9200 (Sample Demo Helpline)',
    toll_free: '1913 (Corporation Desk)',
    address: 'Greater Chennai Corporation Community Hall, Sydenhams Road, Periamet, Chennai 600003',
    operating_hours: 'Always open during cyclones & floods',
    status: 'active',
    description: 'Concrete elevated hurricane and cyclone haven with 200+ cots, dry toilet blocks, mobile charging bank, and medical station.',
    latitude: 13.0839,
    longitude: 80.2728,
    created_at: new Date().toISOString(),
  },
  // Chennai - Shelter 2
  {
    id: 'shelt-che-02',
    name: 'Velachery Flood Safe Haven & Community Shelter',
    category_id: 'cat_shelter',
    category_name: 'Shelter',
    region_id: 'reg_chennai',
    region_name: 'Chennai',
    phone: '+91 44 2243 0088 (Sample Demo Helpline)',
    toll_free: '1913 (Corporation Desk)',
    address: 'Municipal Multipurpose Center, 100 Feet Bypass Road, Velachery, Chennai 600042',
    operating_hours: '24 Hours during monsoon inundation',
    status: 'active',
    description: 'Protected high-ground shelter for low-lying Velachery basin residents, family living partitions, and potable water tanks.',
    latitude: 12.9815,
    longitude: 80.218,
    created_at: new Date().toISOString(),
  },
  // Chennai - Food & Water 1
  {
    id: 'food-che-01',
    name: 'Greater Chennai Corporation Community Disaster Kitchen - T. Nagar',
    category_id: 'cat_food_water',
    category_name: 'Food & Water',
    region_id: 'reg_chennai',
    region_name: 'Chennai',
    phone: '+91 44 2834 1122 (Sample Demo Helpline)',
    toll_free: '1913 (GCC Command Desk)',
    address: 'Ward 136 Municipal Depot, Usman Road, T. Nagar, Chennai 600017',
    operating_hours: '05:30 AM - 10:30 PM (24h on disaster alert)',
    status: 'active',
    description: 'Mass community preparation of hot sambar rice, chapathis, and clean water packets distributed via disaster boat shuttles.',
    latitude: 13.0418,
    longitude: 80.2341,
    created_at: new Date().toISOString(),
  },
  // Chennai - Food & Water 2
  {
    id: 'food-che-02',
    name: 'Perambur Water Tanker & Dry Grocery Relief Center',
    category_id: 'cat_food_water',
    category_name: 'Food & Water',
    region_id: 'reg_chennai',
    region_name: 'Chennai',
    phone: '+91 44 2551 2299 (Sample Demo Helpline)',
    toll_free: '1913 (GCC Command Desk)',
    address: 'Chennai Metro Water Depot, Patel Road, Perambur, Chennai 600011',
    operating_hours: '24 Hours / 7 Days a week',
    status: 'active',
    description: 'Continuous fleet distribution of chlorinated water tankers, chlorine tablets for well disinfection, and 5kg rice ration kits.',
    latitude: 13.1147,
    longitude: 80.2443,
    created_at: new Date().toISOString(),
  },
  // Chennai - Govt Help 1
  {
    id: 'govt-che-01',
    name: 'Tamil Nadu State Disaster Management Authority (TNSDMA)',
    category_id: 'cat_govt_help',
    category_name: 'Government Helpline',
    region_id: 'reg_chennai',
    region_name: 'Chennai',
    phone: '+91 44 2859 3990 (Sample Demo Helpline)',
    toll_free: '1070 (State Emergency Helpline)',
    address: 'Ezhilagam, Chepauk, Chennai, Tamil Nadu 600005',
    operating_hours: 'Continuous 24/7 Monitoring',
    status: 'active',
    description: 'Apex disaster control room monitoring Bay of Bengal cyclone storm surges, reservoir discharge warnings, and emergency relief units.',
    latitude: 13.0642,
    longitude: 80.2801,
    created_at: new Date().toISOString(),
  },
  // Chennai - Govt Help 2
  {
    id: 'govt-che-02',
    name: 'Greater Chennai Corporation 1913 Emergency Command Center',
    category_id: 'cat_govt_help',
    category_name: 'Government Helpline',
    region_id: 'reg_chennai',
    region_name: 'Chennai',
    phone: '+91 44 2538 4520 (Sample Demo Helpline)',
    toll_free: '1913 (GCC Toll-Free)',
    address: 'Ripon Building, Raja Muthiah Road, Kannappar Thidal, Periamet, Chennai 600003',
    operating_hours: '24 Hours / 7 Days a week',
    status: 'active',
    description: 'Coordinates water stagnation pumping trucks, fallen tree clearance squads, street electrical isolation, and relief supplies.',
    latitude: 13.0825,
    longitude: 80.2754,
    created_at: new Date().toISOString(),
  },
  // Chennai - NGO 1
  {
    id: 'ngo-che-01',
    name: 'SEEDS India Emergency Disaster Wardens',
    category_id: 'cat_ngo',
    category_name: 'NGO',
    region_id: 'reg_chennai',
    region_name: 'Chennai',
    phone: '+91 44 4210 9980 (Sample Demo Helpline)',
    toll_free: '1800 102 4343 (Sample Demo Helpline)',
    address: 'First Seaward Road, Valmiki Nagar, Thiruvanmiyur, Chennai 600041',
    operating_hours: '24 Hours Response Line',
    status: 'active',
    description: 'Community-led volunteer emergency wardens providing water disinfection tablets, inflatable rescue dinghies, and shelter assistance.',
    latitude: 12.983,
    longitude: 80.2594,
    created_at: new Date().toISOString(),
  },
  // Chennai - NGO 2
  {
    id: 'ngo-che-02',
    name: 'Bhoomika Trust Disaster Relief & Rehabilitation',
    category_id: 'cat_ngo',
    category_name: 'NGO',
    region_id: 'reg_chennai',
    region_name: 'Chennai',
    phone: '+91 44 2498 7750 (Sample Demo Helpline)',
    toll_free: '1800 200 7750 (Sample Demo Helpline)',
    address: 'Oliver Road, Mylapore, Chennai, Tamil Nadu 600004',
    operating_hours: '08:00 AM - 08:00 PM (Emergency 24h)',
    status: 'active',
    description: 'Volunteer field kitchens, emergency medical aid camps, dry ration packs, and school rehabilitation support after floods.',
    latitude: 13.0368,
    longitude: 80.2676,
    created_at: new Date().toISOString(),
  },

  // ==========================================
  // 4. KOLKATA (reg_kolkata)
  // ==========================================
  // Kolkata - Medical 1
  {
    id: 'med-kol-01',
    name: 'Calcutta National Medical College & Hospital Emergency',
    category_id: 'cat_medical',
    category_name: 'Medical',
    region_id: 'reg_kolkata',
    region_name: 'Kolkata',
    phone: '+91 33 2284 4834 (Sample Demo Helpline)',
    toll_free: '108 (State Emergency Ambulance)',
    address: '32, Gorachand Road, Beniapukur, Kolkata, West Bengal 700014',
    operating_hours: '24 Hours / 7 Days a week',
    status: 'active',
    description: 'Major multi-specialty government teaching hospital with 24/7 emergency casualty, blood bank, critical trauma ICU, and storm triage unit.',
    latitude: 22.5452,
    longitude: 88.3689,
    created_at: new Date().toISOString(),
  },
  // Kolkata - Medical 2
  {
    id: 'med-kol-02',
    name: 'SSKM Hospital (IPGMER) Emergency Trauma Unit',
    category_id: 'cat_medical',
    category_name: 'Medical',
    region_id: 'reg_kolkata',
    region_name: 'Kolkata',
    phone: '+91 33 2223 1589 (Sample Demo Helpline)',
    toll_free: '108 (State Emergency Ambulance)',
    address: '244, Acharya Jagadish Chandra Bose Road, Bhowanipore, Kolkata 700020',
    operating_hours: '24 Hours / 7 Days a week',
    status: 'active',
    description: 'Apex premier government referral hospital in Eastern India with level-1 trauma care, neurosurgical emergency, and critical care units.',
    latitude: 22.5393,
    longitude: 88.3444,
    created_at: new Date().toISOString(),
  },
  // Kolkata - Medical 3
  {
    id: 'med-kol-03',
    name: 'Nil Ratan Sircar (NRS) Medical College Emergency Ward',
    category_id: 'cat_medical',
    category_name: 'Medical',
    region_id: 'reg_kolkata',
    region_name: 'Kolkata',
    phone: '+91 33 2265 3214 (Sample Demo Helpline)',
    toll_free: '108 (State Emergency Ambulance)',
    address: '138, AJC Bose Road, Sealdah, Raja Bazar, Kolkata 700014',
    operating_hours: '24 Hours / 7 Days a week',
    status: 'active',
    description: 'Round-the-clock casualty department located near Sealdah terminal, high-volume trauma resuscitation beds, and disaster response ambulances.',
    latitude: 22.5641,
    longitude: 88.3712,
    created_at: new Date().toISOString(),
  },
  // Kolkata - Rescue 1
  {
    id: 'resc-kol-01',
    name: 'West Bengal Civil Defence & State SAR Squadron',
    category_id: 'cat_rescue',
    category_name: 'Rescue',
    region_id: 'reg_kolkata',
    region_name: 'Kolkata',
    phone: '+91 33 2214 5580 (Sample Demo Helpline)',
    toll_free: '1070 (Disaster Control)',
    address: '81/2/2, Phears Lane, Bowbazar, Kolkata, West Bengal 700012',
    operating_hours: 'Immediate 24-Hour Deployment',
    status: 'active',
    description: 'Amphibious flood rescue crafts, cyclone tree cutters, underwater rescue diving teams, and building collapse search squads.',
    latitude: 22.5712,
    longitude: 88.3582,
    created_at: new Date().toISOString(),
  },
  // Kolkata - Rescue 2
  {
    id: 'resc-kol-02',
    name: 'Kolkata Police Disaster Management Group (DMG)',
    category_id: 'cat_rescue',
    category_name: 'Rescue',
    region_id: 'reg_kolkata',
    region_name: 'Kolkata',
    phone: '+91 33 2214 3024 (Sample Demo Helpline)',
    toll_free: '100 / 112 (Emergency Rescue)',
    address: 'Bodyguard Lines, 7, D.H. Road, Alipore, Kolkata 700027',
    operating_hours: '24 Hours / 7 Days a week',
    status: 'active',
    description: 'Specially trained quick-reaction force for waterlogging rescue, high-power pump stations, and rapid urban casualty extraction.',
    latitude: 22.5312,
    longitude: 88.3289,
    created_at: new Date().toISOString(),
  },
  // Kolkata - Shelter 1
  {
    id: 'shelt-kol-01',
    name: 'Kolkata Municipal Corporation Flood Shelter',
    category_id: 'cat_shelter',
    category_name: 'Shelter',
    region_id: 'reg_kolkata',
    region_name: 'Kolkata',
    phone: '+91 33 2286 1212 (Sample Demo Helpline)',
    toll_free: '1800 345 3375',
    address: '5, S.N. Banerjee Road, Taltala, Kolkata, West Bengal 700013',
    operating_hours: '24 Hours / 7 Days a week',
    status: 'active',
    description: 'Elevated flood relief haven with dry floor accommodation, child care area, and standby paramedic station.',
    latitude: 22.5601,
    longitude: 88.3524,
    created_at: new Date().toISOString(),
  },
  // Kolkata - Shelter 2
  {
    id: 'shelt-kol-02',
    name: 'Howrah Cyclone & Storm Safe Haven',
    category_id: 'cat_shelter',
    category_name: 'Shelter',
    region_id: 'reg_kolkata',
    region_name: 'Kolkata',
    phone: '+91 33 2638 3261 (Sample Demo Helpline)',
    toll_free: '1800 345 3375',
    address: 'Howrah Municipal Corporation Hall, 4, Mahatma Gandhi Road, Howrah 711101',
    operating_hours: 'Always open during cyclonic weather alerts',
    status: 'active',
    description: 'Reinforced concrete storm haven for River Hooghly overflow zones, 160 sleeping mats, hygiene sanitation packs, and potable water.',
    latitude: 22.5892,
    longitude: 88.3281,
    created_at: new Date().toISOString(),
  },
  // Kolkata - Food & Water 1
  {
    id: 'food-kol-01',
    name: 'KMC Central Potable Water & Dry Ration Depot - Bowbazar',
    category_id: 'cat_food_water',
    category_name: 'Food & Water',
    region_id: 'reg_kolkata',
    region_name: 'Kolkata',
    phone: '+91 33 2237 4589 (Sample Demo Helpline)',
    toll_free: '1800 345 3375',
    address: 'KMC Water Supply Compound, Bipin Behari Ganguly St, Bowbazar, Kolkata 700012',
    operating_hours: '06:00 AM - 10:00 PM (24h in crisis)',
    status: 'active',
    description: 'Municipal drinking water bowsers, sealed water pouch manufacturing plant, baby nourishment food, and rice/dal relief kits.',
    latitude: 22.5684,
    longitude: 88.3619,
    created_at: new Date().toISOString(),
  },
  // Kolkata - Food & Water 2
  {
    id: 'food-kol-02',
    name: 'Salt Lake Community Emergency Kitchen & Water Station',
    category_id: 'cat_food_water',
    category_name: 'Food & Water',
    region_id: 'reg_kolkata',
    region_name: 'Kolkata',
    phone: '+91 33 2359 8899 (Sample Demo Helpline)',
    toll_free: '1800 345 3375',
    address: 'FD Block Community Hall, Sector III, Bidhannagar, Kolkata 700091',
    operating_hours: '24 Hours during severe waterlogging',
    status: 'active',
    description: 'Hot meal preparation units serving khichuri and dry ration relief bags for waterlogged families across eastern Kolkata.',
    latitude: 22.5841,
    longitude: 88.4112,
    created_at: new Date().toISOString(),
  },
  // Kolkata - Govt Help 1
  {
    id: 'govt-kol-01',
    name: 'West Bengal Disaster Management Dept Control Room (Nabanna)',
    category_id: 'cat_govt_help',
    category_name: 'Government Helpline',
    region_id: 'reg_kolkata',
    region_name: 'Kolkata',
    phone: '+91 33 2214 3526 (Sample Demo Helpline)',
    toll_free: '1070 (Disaster Helpline)',
    address: 'Nabanna, 325 Sarat Chatterjee Road, Mandirtala, Shibpur, Kolkata 711102',
    operating_hours: 'Continuous 24/7 Monitoring',
    status: 'active',
    description: 'Central state command desk for meteorological weather warnings, dam water discharge alerts, and district magistrate relief operations.',
    latitude: 22.5647,
    longitude: 88.3243,
    created_at: new Date().toISOString(),
  },
  // Kolkata - Govt Help 2
  {
    id: 'govt-kol-02',
    name: 'Kolkata Police Central Emergency Control Room',
    category_id: 'cat_govt_help',
    category_name: 'Government Helpline',
    region_id: 'reg_kolkata',
    region_name: 'Kolkata',
    phone: '+91 33 2214 3230 (Sample Demo Helpline)',
    toll_free: '100 / 112 (Universal SOS)',
    address: 'Lalbazar Police HQ, 18, Lalbazar Street, B.B.D. Bagh, Kolkata 700001',
    operating_hours: '24 Hours / 7 Days a week',
    status: 'active',
    description: 'City-wide police response, traffic flood diversions, missing persons desk, and emergency escort for medical ambulances.',
    latitude: 22.5732,
    longitude: 88.3512,
    created_at: new Date().toISOString(),
  },
  // Kolkata - NGO 1
  {
    id: 'ngo-kol-01',
    name: 'Bharat Sevashram Sangha Disaster Relief Wing',
    category_id: 'cat_ngo',
    category_name: 'NGO',
    region_id: 'reg_kolkata',
    region_name: 'Kolkata',
    phone: '+91 33 2440 2341 (Sample Demo Helpline)',
    toll_free: '1800 120 2341 (Sample Demo Helpline)',
    address: '211, Rashbehari Avenue, Ballygunge, Kolkata, West Bengal 700019',
    operating_hours: '24 Hours Response Line',
    status: 'active',
    description: 'Extensive grassroots volunteer network distributing dry rations, clothing, tarpaulins, water purification packets, and mobile health vans.',
    latitude: 22.5186,
    longitude: 88.3672,
    created_at: new Date().toISOString(),
  },
  // Kolkata - NGO 2
  {
    id: 'ngo-kol-02',
    name: 'CINI (Child In Need Institute) Emergency Relief Cell',
    category_id: 'cat_ngo',
    category_name: 'NGO',
    region_id: 'reg_kolkata',
    region_name: 'Kolkata',
    phone: '+91 33 2497 8206 (Sample Demo Helpline)',
    toll_free: '1800 345 8206 (Sample Demo Helpline)',
    address: 'Daulatpur, P.O. Pailan, Via Joka, Kolkata 700104',
    operating_hours: '08:30 AM - 07:30 PM (24h in crisis)',
    status: 'active',
    description: 'Specialized maternal and child nutrition in disaster shelters, adolescent psychological support, and post-flood hygiene kits.',
    latitude: 22.4612,
    longitude: 88.2915,
    created_at: new Date().toISOString(),
  },

  // ==========================================
  // 5. AHMEDABAD (reg_ahmedabad)
  // ==========================================
  // Ahmedabad - Medical 1
  {
    id: 'med-ahm-01',
    name: 'Ahmedabad Civil Hospital Emergency Trauma Center',
    category_id: 'cat_medical',
    category_name: 'Medical',
    region_id: 'reg_ahmedabad',
    region_name: 'Ahmedabad',
    phone: '+91 79 2268 3721 (Sample Demo Helpline)',
    toll_free: '108 (State Emergency Ambulance)',
    address: 'Asarwa, Near Meghaninagar, Ahmedabad, Gujarat 380016',
    operating_hours: '24 Hours / 7 Days a week',
    status: 'active',
    description: 'One of Asia\'s largest public hospitals with 2,000+ beds, advanced 24/7 casualty trauma center, burn care unit, and flood resuscitation ward.',
    latitude: 23.0525,
    longitude: 72.6041,
    created_at: new Date().toISOString(),
  },
  // Ahmedabad - Medical 2
  {
    id: 'med-ahm-02',
    name: 'Shardaben General Hospital Emergency Casualty Unit',
    category_id: 'cat_medical',
    category_name: 'Medical',
    region_id: 'reg_ahmedabad',
    region_name: 'Ahmedabad',
    phone: '+91 79 2292 1211 (Sample Demo Helpline)',
    toll_free: '108 (State Emergency Ambulance)',
    address: 'Saraspur, Near Raipur Gate, Ahmedabad, Gujarat 380018',
    operating_hours: '24 Hours / 7 Days a week',
    status: 'active',
    description: 'East Ahmedabad municipal emergency hospital with 24/7 trauma care, neonatal emergency care, surgical theatre, and ambulance bay.',
    latitude: 23.0298,
    longitude: 72.6131,
    created_at: new Date().toISOString(),
  },
  // Ahmedabad - Medical 3
  {
    id: 'med-ahm-03',
    name: 'LG Hospital Municipal Emergency Trauma Care',
    category_id: 'cat_medical',
    category_name: 'Medical',
    region_id: 'reg_ahmedabad',
    region_name: 'Ahmedabad',
    phone: '+91 79 2546 1121 (Sample Demo Helpline)',
    toll_free: '108 (State Emergency Ambulance)',
    address: 'Maninagar East, Rambaug, Ahmedabad, Gujarat 380008',
    operating_hours: '24 Hours / 7 Days a week',
    status: 'active',
    description: 'Major South Ahmedabad hospital equipped with dedicated emergency casualty, round-the-clock blood bank, and disaster emergency triage.',
    latitude: 22.9984,
    longitude: 72.6048,
    created_at: new Date().toISOString(),
  },
  // Ahmedabad - Rescue 1
  {
    id: 'resc-ahm-01',
    name: 'NDRF 6th Battalion Rapid Deployment Team',
    category_id: 'cat_rescue',
    category_name: 'Rescue',
    region_id: 'reg_ahmedabad',
    region_name: 'Ahmedabad',
    phone: '+91 79 2320 1555 (Sample Demo Helpline)',
    toll_free: '1070 (State Disaster Helpline)',
    address: 'Jarod Base Camp, Near Vadodara-Ahmedabad Expressway, Gujarat 391510',
    operating_hours: '24 Hours / 7 Days a week',
    status: 'active',
    description: 'Federal disaster battalion trained for earthquake structural collapse, Sabarmati River flood rescue, and chemical industrial accidents.',
    latitude: 22.3072,
    longitude: 73.1812,
    created_at: new Date().toISOString(),
  },
  // Ahmedabad - Rescue 2
  {
    id: 'resc-ahm-02',
    name: 'Ahmedabad Fire & Emergency Services (AFES) Headquarters',
    category_id: 'cat_rescue',
    category_name: 'Rescue',
    region_id: 'reg_ahmedabad',
    region_name: 'Ahmedabad',
    phone: '+91 79 2214 0222 (Sample Demo Helpline)',
    toll_free: '101 (Fire & Disaster Rescue)',
    address: 'Dudheshwar Water Works Campus, Shahibaug Road, Ahmedabad 380004',
    operating_hours: '24 Hours / 7 Days a week',
    status: 'active',
    description: 'Specialized river rescue dinghies for Sabarmati River, chemical spill foam tenders, hydraulic cutters, and heavy dewatering suction trucks.',
    latitude: 23.0487,
    longitude: 72.5852,
    created_at: new Date().toISOString(),
  },
  // Ahmedabad - Shelter 1
  {
    id: 'shelt-ahm-01',
    name: 'Sardar Patel Civic Flood Relief Shelter',
    category_id: 'cat_shelter',
    category_name: 'Shelter',
    region_id: 'reg_ahmedabad',
    region_name: 'Ahmedabad',
    phone: '+91 79 2539 1811 (Sample Demo Helpline)',
    toll_free: '155303 (AMC Civic Helpline)',
    address: 'AMC Community Center, Danapith, Old City, Ahmedabad, Gujarat 380001',
    operating_hours: 'Always open during flood alerts (24/7)',
    status: 'active',
    description: 'Reinforced municipal shelter with clean sleeping accommodations for 170 persons, sanitary provisions, standby generator, and doctor on site.',
    latitude: 23.0238,
    longitude: 72.5861,
    created_at: new Date().toISOString(),
  },
  // Ahmedabad - Shelter 2
  {
    id: 'shelt-ahm-02',
    name: 'Sabarmati Community Night Haven & Relief Camp',
    category_id: 'cat_shelter',
    category_name: 'Shelter',
    region_id: 'reg_ahmedabad',
    region_name: 'Ahmedabad',
    phone: '+91 79 2750 4400 (Sample Demo Helpline)',
    toll_free: '155303 (AMC Civic Helpline)',
    address: 'Sabarmati Riverfront Development Hall, West Bank, Near Usmanpura, Ahmedabad 380013',
    operating_hours: '24 Hours during water release from Dharoi Dam',
    status: 'active',
    description: 'Elevated refuge safe haven for riverbed hut dwellers, with warm bedding, child daycare space, and hot drinking water supply.',
    latitude: 23.0512,
    longitude: 72.5714,
    created_at: new Date().toISOString(),
  },
  // Ahmedabad - Food & Water 1
  {
    id: 'food-ahm-01',
    name: 'Ahmedabad Relief Kitchen & Water Depots',
    category_id: 'cat_food_water',
    category_name: 'Food & Water',
    region_id: 'reg_ahmedabad',
    region_name: 'Ahmedabad',
    phone: '+91 79 2539 1811 (Sample Demo Helpline)',
    toll_free: '155303',
    address: 'Sardar Patel Bhavan, Danapith, Ahmedabad, Gujarat 380001',
    operating_hours: '24 Hours during severe waterlogging',
    status: 'active',
    description: 'Mass community kitchen producing hot dry meals, purified water refilling stations, and distribution to submerged low-lying areas.',
    latitude: 23.0225,
    longitude: 72.5872,
    created_at: new Date().toISOString(),
  },
  // Ahmedabad - Food & Water 2
  {
    id: 'food-ahm-02',
    name: 'Maninagar Emergency Water Supply & Ration Point',
    category_id: 'cat_food_water',
    category_name: 'Food & Water',
    region_id: 'reg_ahmedabad',
    region_name: 'Ahmedabad',
    phone: '+91 79 2546 3390 (Sample Demo Helpline)',
    toll_free: '155303 (AMC Civic Helpline)',
    address: 'South Zone AMC Office, Near Kankaria Lake, Maninagar, Ahmedabad 380028',
    operating_hours: '06:30 AM - 09:30 PM (24h in emergencies)',
    status: 'active',
    description: 'Fleet of 50 water tankers on standby, packaged mineral water bottles, thepla and sukhadi packets for emergency relief distribution.',
    latitude: 23.0039,
    longitude: 72.6025,
    created_at: new Date().toISOString(),
  },
  // Ahmedabad - Govt Help 1
  {
    id: 'govt-ahm-01',
    name: 'Gujarat State Disaster Management Authority (GSDMA) SEOC',
    category_id: 'cat_govt_help',
    category_name: 'Government Helpline',
    region_id: 'reg_ahmedabad',
    region_name: 'Ahmedabad',
    phone: '+91 79 2325 1900 (Sample Demo Helpline)',
    toll_free: '1070 (State Disaster Operations)',
    address: 'Block No. 11, 5th Floor, Udyog Bhavan, Gandhinagar / Ahmedabad 382011',
    operating_hours: 'Continuous 24/7 Monitoring',
    status: 'active',
    description: 'State Emergency Operation Centre (SEOC) managing reservoir water discharge levels, cyclone alerts, and statewide emergency deployment.',
    latitude: 23.2185,
    longitude: 72.6481,
    created_at: new Date().toISOString(),
  },
  // Ahmedabad - Govt Help 2
  {
    id: 'govt-ahm-02',
    name: 'Ahmedabad Municipal Corporation (AMC) Disaster Cell',
    category_id: 'cat_govt_help',
    category_name: 'Government Helpline',
    region_id: 'reg_ahmedabad',
    region_name: 'Ahmedabad',
    phone: '+91 79 2539 1811 (Sample Demo Helpline)',
    toll_free: '155303 (AMC Emergency Line)',
    address: 'Mahanagar Seva Sadan, Sardar Patel Bhavan, Danapith, Ahmedabad 380001',
    operating_hours: '24 Hours / 7 Days a week',
    status: 'active',
    description: 'City municipal control room managing monsoon waterlogging complaints, fallen tree clearing, storm drain clearing, and health sprays.',
    latitude: 23.0245,
    longitude: 72.5855,
    created_at: new Date().toISOString(),
  },
  // Ahmedabad - NGO 1
  {
    id: 'ngo-ahm-01',
    name: 'Manav Sadhna Disaster Relief Volunteers',
    category_id: 'cat_ngo',
    category_name: 'NGO',
    region_id: 'reg_ahmedabad',
    region_name: 'Ahmedabad',
    phone: '+91 79 2756 4642 (Sample Demo Helpline)',
    toll_free: '1800 233 4642 (Sample Demo Helpline)',
    address: 'Gandhi Ashram Campus, Sabarmati, Ahmedabad, Gujarat 380027',
    operating_hours: '08:00 AM - 08:00 PM (24h during disasters)',
    status: 'active',
    description: 'Community volunteer organization providing emergency food rations, clothing sets, clean drinking water, and post-disaster slum rehabilitation.',
    latitude: 23.0605,
    longitude: 72.5802,
    created_at: new Date().toISOString(),
  },
  // Ahmedabad - NGO 2
  {
    id: 'ngo-ahm-02',
    name: 'Blind People\'s Association (BPA) Disability Disaster Aid',
    category_id: 'cat_ngo',
    category_name: 'NGO',
    region_id: 'reg_ahmedabad',
    region_name: 'Ahmedabad',
    phone: '+91 79 2630 3346 (Sample Demo Helpline)',
    toll_free: '1800 120 3346 (Sample Demo Helpline)',
    address: 'Jagdish Patel Chowk, Surdas Marg, Vastrapur, Ahmedabad 380015',
    operating_hours: '24 Hours Emergency Helpline',
    status: 'active',
    description: 'Specialized emergency disaster evacuation and customized relief kits (talking aid, white canes, wheelchair evacuation) for disabled persons.',
    latitude: 23.0345,
    longitude: 72.5284,
    created_at: new Date().toISOString(),
  },
];

// Local storage keys for fallback storage
const LS_LISTINGS_KEY = 'resq_listings_db_v3';
const LS_SUBMISSIONS_KEY = 'resq_submissions_db';
const LS_REPORTS_KEY = 'resq_reports_db';
const LS_USER_KEY = 'resq_user_session';

function getLocalListings(): Listing[] {
  try {
    const raw = localStorage.getItem(LS_LISTINGS_KEY);
    if (!raw) {
      // Check legacy key 'resq_listings_db' for any custom user-added listings
      const legacyRaw = localStorage.getItem('resq_listings_db');
      let customUserListings: Listing[] = [];
      if (legacyRaw) {
        try {
          const legacyParsed = JSON.parse(legacyRaw) as Listing[];
          customUserListings = legacyParsed.filter(
            (l) => !INITIAL_LISTINGS.some((init) => init.id === l.id)
          );
        } catch {
          // Ignore
        }
      }
      const combined = [...customUserListings, ...INITIAL_LISTINGS];
      localStorage.setItem(LS_LISTINGS_KEY, JSON.stringify(combined));
      return combined;
    }

    const parsed = JSON.parse(raw) as Listing[];
    // Ensure all new initial listings are present while retaining user-submitted ones
    if (parsed.length < INITIAL_LISTINGS.length) {
      const userCustom = parsed.filter(
        (l) => !INITIAL_LISTINGS.some((init) => init.id === l.id)
      );
      const updated = [...userCustom, ...INITIAL_LISTINGS];
      localStorage.setItem(LS_LISTINGS_KEY, JSON.stringify(updated));
      return updated;
    }
    return parsed;
  } catch {
    return INITIAL_LISTINGS;
  }
}

function saveLocalListings(listings: Listing[]) {
  try {
    localStorage.setItem(LS_LISTINGS_KEY, JSON.stringify(listings));
  } catch (e) {
    console.error('Failed to save listings locally', e);
  }
}

function getLocalSubmissions(): Submission[] {
  try {
    const raw = localStorage.getItem(LS_SUBMISSIONS_KEY);
    if (!raw) {
      // Seed 1 pending submission for demo admin review
      const defaultSubmissions: Submission[] = [
        {
          id: 'sub-demo-1',
          resource_name: 'Apex Civic Flood Relief Tent - Kurla West',
          name: 'Apex Civic Flood Relief Tent - Kurla West',
          category: 'Shelter',
          region: 'Mumbai',
          phone: '+91 98200 44556',
          address: 'Station Approach Road, Kurla West, Mumbai 400070',
          operating_hours: '24 Hours during red monsoon alert',
          description: 'Emergency waterproof relief tent with 60 cots and first aid supplies.',
          status: 'pending',
          submitted_by: 'contributor@somaiya.edu',
          created_at: new Date(Date.now() - 3600000).toISOString(),
          updated_at: new Date(Date.now() - 3600000).toISOString(),
        },
      ];
      localStorage.setItem(LS_SUBMISSIONS_KEY, JSON.stringify(defaultSubmissions));
      return defaultSubmissions;
    }
    const parsed = JSON.parse(raw) as Submission[];
    // Normalize resource_name and name
    return parsed.map((s) => ({
      ...s,
      resource_name: s.resource_name || s.name || '',
      name: s.resource_name || s.name || '',
    }));
  } catch {
    return [];
  }
}

function saveLocalSubmissions(submissions: Submission[]) {
  try {
    localStorage.setItem(LS_SUBMISSIONS_KEY, JSON.stringify(submissions));
  } catch (e) {
    console.error('Failed to save submissions locally', e);
  }
}

function getLocalReports(): Report[] {
  try {
    const raw = localStorage.getItem(LS_REPORTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalReport(report: Report) {
  try {
    const reports = getLocalReports();
    reports.push(report);
    localStorage.setItem(LS_REPORTS_KEY, JSON.stringify(reports));
  } catch (e) {
    console.error('Failed to save report locally', e);
  }
}

// ==========================================
// DATA SERVICE API
// ==========================================

export async function fetchCategories(): Promise<Category[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('categories').select('*');
      if (!error && data && data.length > 0) {
        return data as Category[];
      }
    } catch {
      // Fallback seamlessly on connection issues
    }
  }
  return INITIAL_CATEGORIES;
}

export async function fetchRegions(): Promise<Region[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('regions').select('*');
      if (!error && data && data.length > 0) {
        return data as Region[];
      }
    } catch {
      // Fallback seamlessly
    }
  }
  return INITIAL_REGIONS;
}

export async function fetchListings(): Promise<Listing[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('status', 'active');
      if (!error && data && data.length > 0) {
        return data as Listing[];
      }
    } catch {
      // Fallback
    }
  }
  return getLocalListings().filter((l) => l.status === 'active');
}

export async function createSubmission(
  submission: Omit<Submission, 'id' | 'status' | 'created_at' | 'updated_at'>
): Promise<{ success: boolean; error?: string }> {
  try {
    const resName = submission.resource_name || submission.name || '';
    const newSubmission: Submission = {
      ...submission,
      resource_name: resName,
      name: resName,
      id: 'sub-' + Date.now().toString(36),
      status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (supabase) {
      try {
        const { error } = await supabase.from('submissions').insert([
          {
            submitted_by: newSubmission.submitted_by,
            resource_name: newSubmission.resource_name,
            category: newSubmission.category,
            region: newSubmission.region,
            phone: newSubmission.phone,
            address: newSubmission.address,
            operating_hours: newSubmission.operating_hours || '',
            description: newSubmission.description || '',
            status: 'pending',
          },
        ]);
        if (!error) return { success: true };
      } catch {
        // Fallback
      }
    }

    const current = getLocalSubmissions();
    saveLocalSubmissions([newSubmission, ...current]);
    return { success: true };
  } catch {
    return { success: false, error: 'Something went wrong. Please try again.' };
  }
}

export async function fetchSubmissions(user?: UserProfile | null): Promise<Submission[]> {
  if (supabase && user) {
    try {
      let query = supabase.from('submissions').select('*').order('created_at', { ascending: false });
      if (user.role === 'Contributor') {
        query = query.eq('submitted_by', user.email);
      }
      const { data, error } = await query;
      if (!error && data) {
        return data.map((item: any) => ({
          ...item,
          resource_name: item.resource_name || item.name || '',
          name: item.resource_name || item.name || '',
        })) as Submission[];
      }
    } catch {
      // Fallback
    }
  }

  const all = getLocalSubmissions();
  if (!user) {
    return all;
  }
  if (user.role === 'Admin') {
    return all;
  }
  if (user.role === 'Contributor') {
    return all.filter(
      (s) => s.submitted_by === user.email || s.submitted_by === user.id
    );
  }
  return [];
}

export async function updateSubmissionStatus(
  id: string,
  status: 'approved' | 'rejected'
): Promise<{ success: boolean; error?: string }> {
  try {
    const submissions = getLocalSubmissions();
    const target = submissions.find((s) => s.id === id);

    if (target) {
      target.status = status;
      target.updated_at = new Date().toISOString();
      saveLocalSubmissions([...submissions]);

      // If approved, automatically create a new active listing as per specification!
      if (status === 'approved') {
        const listings = getLocalListings();
        const catObj = INITIAL_CATEGORIES.find(
          (c) => c.name.toLowerCase() === target.category.toLowerCase()
        );
        const regObj = INITIAL_REGIONS.find(
          (r) => r.name.toLowerCase() === target.region.toLowerCase()
        );

        const newListing: Listing = {
          id: 'list-' + Date.now().toString(36),
          name: target.resource_name || target.name || 'Emergency Resource',
          category_id: catObj ? catObj.id : 'cat_medical',
          category_name: target.category as EmergencyCategory,
          region_id: regObj ? regObj.id : 'reg_mumbai',
          region_name: target.region,
          phone: target.phone,
          address: target.address,
          operating_hours: target.operating_hours || '24 Hours / 7 Days a week',
          status: 'active',
          description: target.description || '',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        saveLocalListings([newListing, ...listings]);

        if (supabase) {
          try {
            await supabase.from('listings').insert([newListing]);
          } catch {
            // Keep going
          }
        }
      }
    }

    if (supabase) {
      try {
        await supabase
          .from('submissions')
          .update({ status, updated_at: new Date().toISOString() })
          .eq('id', id);
      } catch {
        // Handled
      }
    }

    return { success: true };
  } catch {
    return { success: false, error: 'Something went wrong. Please try again.' };
  }
}

export async function createReport(
  report: Omit<Report, 'id' | 'created_at'>
): Promise<{ success: boolean; error?: string }> {
  try {
    const newReport: Report = {
      ...report,
      id: 'rep-' + Date.now().toString(36),
      created_at: new Date().toISOString(),
    };

    if (supabase) {
      try {
        const { error } = await supabase.from('reports').insert([newReport]);
        if (!error) return { success: true };
      } catch {
        // Handback
      }
    }

    saveLocalReport(newReport);
    return { success: true };
  } catch {
    return { success: false, error: 'Something went wrong. Please try again.' };
  }
}

// ==========================================
// AUTHENTICATION
// ==========================================

export function mapRole(rawRole?: string, email?: string): UserProfile['role'] {
  if (!rawRole && email) {
    const lower = email.toLowerCase();
    if (lower.includes('admin')) return 'Admin';
    if (lower.includes('public') || lower.includes('guest')) return 'Public User';
    return 'Contributor';
  }
  const clean = (rawRole || '').toLowerCase();
  if (clean === 'admin') return 'Admin';
  if (clean === 'public_user' || clean === 'public user' || clean === 'user') return 'Public User';
  return 'Contributor';
}

export async function getCurrentUser(): Promise<UserProfile | null> {
  if (supabase) {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        return {
          id: session.user.id,
          email: session.user.email || '',
          role: mapRole(profile?.role, session.user.email),
        };
      }
    } catch {
      // Fallback
    }
  }

  try {
    const raw = localStorage.getItem(LS_USER_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...parsed,
        role: mapRole(parsed.role, parsed.email),
      };
    }
    return null;
  } catch {
    return null;
  }
}

export async function signInUser(
  email: string,
  pass: string
): Promise<{ user: UserProfile | null; error?: string }> {
  if (supabase) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: pass,
      });
      if (error) {
        return { user: null, error: error.message };
      }
      if (data.user) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();
        const role = mapRole(profileData?.role, data.user.email);
        const profile: UserProfile = {
          id: data.user.id,
          email: data.user.email || email,
          role,
        };
        localStorage.setItem(LS_USER_KEY, JSON.stringify(profile));
        return { user: profile };
      }
    } catch {
      // Fallback
    }
  }

  // Local auth fallback for test/demo mode
  const role = mapRole(undefined, email);
  const profile: UserProfile = {
    id: 'user-' + btoa(email).slice(0, 8),
    email,
    role,
  };
  localStorage.setItem(LS_USER_KEY, JSON.stringify(profile));
  return { user: profile };
}

export async function signUpUser(
  email: string,
  pass: string,
  selectedRole?: UserProfile['role']
): Promise<{ user: UserProfile | null; error?: string }> {
  const finalRole: UserProfile['role'] = selectedRole || mapRole(undefined, email);

  if (supabase) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password: pass,
      });
      if (error) {
        return { user: null, error: error.message };
      }
      if (data.user) {
        // Insert into profiles
        try {
          await supabase.from('profiles').insert([
            {
              id: data.user.id,
              email: data.user.email || email,
              role: finalRole,
            },
          ]);
        } catch {
          // Ignored if handled via trigger
        }

        const profile: UserProfile = {
          id: data.user.id,
          email: data.user.email || email,
          role: finalRole,
        };
        localStorage.setItem(LS_USER_KEY, JSON.stringify(profile));
        return { user: profile };
      }
    } catch {
      // Fallback
    }
  }

  const profile: UserProfile = {
    id: 'user-' + btoa(email).slice(0, 8),
    email,
    role: finalRole,
  };
  localStorage.setItem(LS_USER_KEY, JSON.stringify(profile));
  return { user: profile };
}

export async function signOutUser(): Promise<void> {
  if (supabase) {
    try {
      await supabase.auth.signOut();
    } catch {
      // Ignore
    }
  }
  localStorage.removeItem(LS_USER_KEY);
}
