import { Pharmacy } from "../types/dataTypes";
import {
    APPLY_FILTER, FETCH_ALL_PHARMACIES,
    UPDATE_RELATIVE_DISTANCES
} from "./actions";

interface PharmaciesState {
    all: Pharmacy[];
    open: Pharmacy[];
    toDisplay: Pharmacy[];
}

const pharmaciesState: PharmaciesState = {
    all: [],
    open: [],
    toDisplay: [],
};

export default (state: PharmaciesState = pharmaciesState, action: any) => {
    switch (action.type) {
        case FETCH_ALL_PHARMACIES:
            // console.log(action.pharmaciesDatas);
            return {
                ...state,
                all: action.pharmaciesDatas,
                toDisplay: action.pharmaciesDatas,
            };
        case UPDATE_RELATIVE_DISTANCES:
            console.log(action.data[1]);
            let obj = { ...state, all: action.data, toDisplay: action.data };
            return obj;
        case APPLY_FILTER:
            const filter: string = action.data.toLowerCase();
            if (!filter) {
                return { ...state, toDisplay: state.toDisplay };
            }
            const filtered = state.all.filter((pharmacy) => {
                return pharmacy.flat_name.toLowerCase().includes(filter);
            });
            return { ...state, toDisplay: filtered };
        default:
            return { ...state };
    }
};
