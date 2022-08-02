// export interface Pharmacy {
//     Commune: string;
//     Id: string;
//     Localisation: string;
//     Nom: string;
//     Numero: string;
//     Position: string;
//     Distance?: number; // Should remove this later
// }

export interface Pharmacy {
    phid: string;
    name: string;
    _name: string;
    _name_safe: string;
    flat_name: string;
    supervisor?: string;
    coordinates: {
        lat: string;
        lng: string;
    };
    geographical_position?: string;
    google_maps_position_link?: string;
    phone_numbers?: string[];
    open: boolean;
    open_from?: string;
    open_until?: string;
    distance ?: number | string;
}

export type Pharmacies = Pharmacy[];

export interface RootReducerType {
    pharmacies: {
        all: Pharmacy[];
        open: Pharmacy[];
        toDisplay: Pharmacy[];
    };
}

export interface FireBaseResponseObject {
    [key: string]: Pharmacy[];
}
