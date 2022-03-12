export interface Pharmacy {
    Commune: string;
    Id: string;
    Localisation: string;
    Nom: string;
    Numero: string;
    Position: string;
    Distance?: number; // Should remove this later
}

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
