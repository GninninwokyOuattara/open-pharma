import { PROJECT_ENDPOINT, ALL_PHARMACIES } from "@env";
import { Pharmacy } from "../types/dataTypes";
import {
    FETCH_OPEN_PHARMACIES,
    FETCH_ALL_PHARMACIES,
    UPDATE_RELATIVE_DISTANCES,
} from "./actions";

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
        case UPDATE_RELATIVE_DISTANCES:
            console.log(action.data[1]);
            const obj = { ...state, all: action.data };
            return obj;
        default:
            return { ...state };
    }
};
