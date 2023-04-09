// export interface Pharmacy {
//     Commune: string;
//     Id: string;
//     Localisation: string;
//     Nom: string;
//     Numero: string;
//     Position: string;
//     Distance?: number; // Should remove this later
// }

export interface DBPharmacy {
  id: string;
  name: string;
  _name: string;
  _name_safe: string;
  flat_name: string;
  supervisor?: string;
  coordinates: string;
  geographical_position?: string;
  google_maps_position_link?: string;
  phone_numbers?: string;
  open: number;
  open_from?: string;
  open_until?: string;
}

// export interface Pharmacy {
//   id: string;
//   name: string;
//   _name: string;
//   _name_safe: string;
//   flat_name: string;
//   supervisor?: string;
//   coordinates: {
//     lat: string;
//     lng: string;
//   };
//   geographical_position?: string;
//   google_maps_position_link?: string;
//   phone_numbers?: string[];
//   open: boolean;
//   open_from?: string;
//   open_until?: string;
//   distance?: number | string;
//   distanceRaw?: number;
// }

export type Pharmacies = Pharmacy[];

export interface RootReducerType {
  pharmacies: {
    isLocationPermissionGranted: boolean;
    isLoading: boolean;
    isSearchingPharmacy: boolean;
    sortMode: "Proximity" | "Alphabetical";
    displayMode: "All" | "OpenOnly";
    all: Pharmacy[];
    open: Pharmacy[];
    toDisplay: Pharmacy[];
    toDisplayInBottomSheet: PharmacyFullState[];
    toDisplayInMap: Pharmacy[];
    pharmacies: PharmacyFullState[];
  };
}

export interface FireBaseResponseObject {
  [key: string]: Pharmacy[];
}

// new types

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
  distanceToUserReadable?: string;
  distanceToUser?: number;
}

export interface OpenPharmacy extends Pharmacy {
  // date
  open_from: string;
  open_until: string;
}
