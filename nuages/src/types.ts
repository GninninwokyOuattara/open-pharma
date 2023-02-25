export interface Pharmacy {
  id: string;
  name: string;
  description: string;
  director: string;
  addresses: string[];
  phones: string[];
  email: string;
  website: string;
  images: string[];
  google_maps_link: string;
  latitude: number;
  longitude: number;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  date_created: string;
  date_updated: string;
  active: boolean;
  pending_review: boolean;
  is_checked: boolean;
  is_loading: boolean;
}

export interface PharmacyFullState extends Pharmacy {
  open_date_range: null | {
    open_from: string;
    open_until: string;
    date_range_string: string;
  };
  open: boolean;
}

export interface OpenPharmacy extends Pharmacy {
  // date
  open_from: string;
  open_until: string;
}

export interface PendingReviewPharmacy extends Pharmacy {
  active: false;
  pending_review: true;
  time_elapsed: string;
}

export type PharmaciesDataSummary = {
  active_pharmacies_count: number;
  inactive_Pharmacies_count: number;
  open_pharmacies_count: number;
};

export interface PharmaciesStateAndSummary {
  pharmacies: PharmacyFullState[];
  summary: PharmaciesDataSummary;
}
