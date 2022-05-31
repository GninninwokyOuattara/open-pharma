import { PROJECT_ENDPOINT, ALL_PHARMACIES } from "@env";
import { Pharmacy } from "../types/dataTypes";
import {
    FETCH_OPEN_PHARMACIES,
    FETCH_ALL_PHARMACIES,
    UPDATE_RELATIVE_DISTANCES,
    APPLY_FILTER,
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
        // case APPLY_FILTER:
        //     const filter: string = action.data.toLowerCase();
        //     if (!filter) {
        //         return { ...state, toDisplay: state.all };
        //     }
        //     const filtered = state.all.filter((pharmacy) => {
        //         return pharmacy.Nom.toLowerCase().includes(filter);
        //     });
        //     return { ...state, toDisplay: filtered };
        default:
            return { ...state };
    }
};
