export interface Pharmacy {
    Commune: string;
    Id: string;
    Localisation: string;
    Nom: string;
    Numero: string;
    Position: string;
}

export interface FireBaseResponseObject {
    [key: string]: Pharmacy[];
}
