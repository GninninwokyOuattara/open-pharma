export interface Pharmacy {
  id: string;
  name: string;
  director: string;
  addresses: string[];
  phones: string[];
  email: string;
  website: string;
  images: string[];
  google_maps_link: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  date_created: string;
  date_updated: string;
  active: boolean;
  pending_review: boolean;
}

export interface OpenPharmacy extends Pharmacy {
  // date
  open_from: string;
  open_until: string;
}

export interface PendingReviewPharmacy extends Pharmacy {
  active: false;
  pending_review: true;
}