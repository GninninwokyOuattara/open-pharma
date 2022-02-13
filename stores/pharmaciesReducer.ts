import { PROJECT_ENDPOINT, ALL_PHARMACIES } from "@env";
import { Pharmacy } from "../types/dataTypes";
import { FETCH_OPEN_PHARMACIES, FETCH_ALL_PHARMACIES } from "./actions";

interface PharmaciesState {
    all: Pharmacy[];
    open: Pharmacy[];
}

const pharmaciesState: PharmaciesState = {
    all: [],
    open: [],
};

export default (state: PharmaciesState = pharmaciesState, action: any) => {
    switch (action.type) {
        case FETCH_ALL_PHARMACIES:
            return { ...state, all: action.data };
        default:
            return { ...state };
    }
};
