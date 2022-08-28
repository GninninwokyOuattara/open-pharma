import { Pharmacy } from "../types/dataTypes";
import {
  APPLY_FILTER,
  CHANGE_DISPLAY_MODE,
  CHANGE_ORDER,
  FETCH_ALL_PHARMACIES,
  UPDATE_RELATIVE_DISTANCES,
} from "./actions";

interface PharmaciesState {
  all: Pharmacy[];
  open: Pharmacy[];
  toDisplay: Pharmacy[];
  toDisplayInBottomSheet: Pharmacy[];
  toDisplayInMap: Pharmacy[];
}

const pharmaciesState: PharmaciesState = {
  all: [],
  open: [],
  toDisplay: [],
  toDisplayInBottomSheet: [],
  toDisplayInMap: [],
};

export default (state: PharmaciesState = pharmaciesState, action: any) => {
  switch (action.type) {
    case FETCH_ALL_PHARMACIES:
      // Filter open pharmacies
      const openPharmacies = action.pharmaciesDatas.filter(
        (pharmacy: Pharmacy) => pharmacy.open
      );

      return {
        ...state,
        all: action.pharmaciesDatas,
        open: openPharmacies,
        toDisplay: action.pharmaciesDatas,
        toDisplayInBottomSheet: action.pharmaciesDatas,
        toDisplayInMap: action.pharmaciesDatas,
      };

    case UPDATE_RELATIVE_DISTANCES:
      // console.log(action.data[1]);
      let obj = {
        ...state,
        // all : action.orderedPharmaciesWithDistances,
        toDisplay: action.orderedPharmaciesWithDistances,
        toDisplayInBottomSheet: action.orderedPharmaciesWithDistances,
      };
      return obj;
    case APPLY_FILTER:
      const filter: string = action.data.toLowerCase();
      if (!filter) {
        return {
          ...state,
          toDisplay: state.toDisplay,
          toDisplayInBottomSheet: state.toDisplayInBottomSheet,
        };
      }
      const filtered = state.all.filter((pharmacy) => {
        return pharmacy.flat_name.toLowerCase().includes(filter);
      });
      return {
        ...state,
        toDisplay: filtered,
        toDisplayInBottomSheet: filtered,
      };
    case CHANGE_DISPLAY_MODE:
      const mode = action.data;
      if (mode == "All") {
        // console.log("Dispatch all")
        return {
          ...state,
          toDisplay: state.all,
          toDisplayInBottomSheet: state.all,
          toDisplayInMap: state.all,
        };
      } else {
        return {
          ...state,
          toDisplay: state.open,
          toDisplayInBottomSheet: state.open,
          toDisplayInMap: state.open,
        };
      }
    case CHANGE_ORDER:
      const pharmacies = action.data;
      console.log(pharmacies[0]);
      return {
        ...state,
        toDisplay: pharmacies,
        toDisplayInBottomSheet: pharmacies,
      };
    default:
      return { ...state };
  }
};
