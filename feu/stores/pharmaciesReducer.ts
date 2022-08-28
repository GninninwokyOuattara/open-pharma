import { Pharmacy } from "../types/dataTypes";
import {
    APPLY_FILTER, CHANGE_DISPLAY_MODE, FETCH_ALL_PHARMACIES,
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

            // Filter open pharmacies
            const openPharmacies = action.pharmaciesDatas.filter((pharmacy : Pharmacy) => pharmacy.open)
            
            return {
                ...state,
                all: action.pharmaciesDatas,
                open : openPharmacies,
                toDisplay: action.pharmaciesDatas,
            };
            
        case UPDATE_RELATIVE_DISTANCES:
            // console.log(action.data[1]);
            let obj = { 
                ...state, 
                // all : action.orderedPharmaciesWithDistances, 
                toDisplay : action.orderedPharmaciesWithDistances };
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
        case CHANGE_DISPLAY_MODE:
            const mode = action.data
            console.log(mode)
            console.log(state.all.length, state.open.length)
            if (mode == "All"){
                console.log("Dispatch all")
                return {...state, toDisplay : state.all};
            } else {
                return {...state , toDisplay : state.open}
            }
        default:
            return { ...state };
    }
};
