export type EmergencyCategory =
  | 'Medical'
  | 'Rescue'
  | 'Shelter'
  | 'Food & Water'
  | 'Government Helpline'
  | 'NGO';

export type ListingStatus = 'active' | 'unverified' | 'inactive';
export type SubmissionStatus = 'pending' | 'approved' | 'rejected';
export type ReportReason =
  | 'Wrong phone number'
  | 'Wrong address'
  | 'Service unavailable'
  | 'Other';

export type UserRole = 'Public User' | 'Contributor' | 'Admin';

export interface Category {
  id: string;
  name: EmergencyCategory;
  description: string;
  icon: string;
}

export interface Region {
  id: string;
  name: string;
  state: string;
  country: string;
}

export interface Listing {
  id: string;
  name: string;
  category_id: string;
  category_name?: EmergencyCategory;
  region_id: string;
  region_name?: string;
  phone: string;
  toll_free?: string;
  address: string;
  operating_hours: string;
  status: ListingStatus;
  description?: string;
  latitude?: number;
  longitude?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Submission {
  id: string;
  resource_name: string;
  name?: string; // Fallback alias
  category: EmergencyCategory;
  region: string;
  phone: string;
  address: string;
  operating_hours?: string;
  description?: string;
  status: SubmissionStatus;
  submitted_by?: string;
  created_at: string;
  updated_at?: string;
}

export interface Report {
  id: string;
  listing_id: string;
  reason: ReportReason;
  description: string;
  created_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
}
