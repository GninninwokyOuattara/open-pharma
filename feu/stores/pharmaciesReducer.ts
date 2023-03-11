import {
  Pharmacy,
  PharmacyFullState,
  RootReducerType,
} from "../types/dataTypes";
import {
  CHANGE_DISPLAY_MODE,
  CHANGE_ORDER,
  GET_OPH_CURRENT_STATE,
  SEARCH_PHARMACIES,
  UPDATE_RELATIVE_DISTANCES,
} from "./actions";

interface PharmaciesState {
  all: Pharmacy[];
  open: Pharmacy[];
  toDisplay: Pharmacy[];
  toDisplayInBottomSheet: PharmacyFullState[];
  toDisplayInMap: Pharmacy[];
  pharmacies: PharmacyFullState[];
}

const pharmaciesState: RootReducerType["pharmacies"] = {
  all: [],
  open: [],
  toDisplay: [],
  toDisplayInBottomSheet: [],
  toDisplayInMap: [],
  pharmacies: [],
};

export default (state: PharmaciesState = pharmaciesState, action: any) => {
  switch (action.type) {
    // case FETCH_ALL_PHARMACIES:
    //   // Filter open pharmacies
    //   const openPharmacies = action.pharmaciesDatas.filter(
    //     (pharmacy: Pharmacy) => pharmacy.open
    //   );

    //   return {
    //     ...state,
    //     all: action.pharmaciesDatas,
    //     open: openPharmacies,
    //     toDisplay: action.pharmaciesDatas,
    //     toDisplayInBottomSheet: action.pharmaciesDatas,
    //     toDisplayInMap: action.pharmaciesDatas,
    //   };

    case GET_OPH_CURRENT_STATE:
      let ophCurrentState = action.data;
      // If i have to do something with the data, i do it here
      return {
        ...state,
        pharmacies: action.data,
        toDisplayInBottomSheet: action.data,
      };
    case UPDATE_RELATIVE_DISTANCES:
      let obj = {
        ...state,
        // all : action.orderedPharmaciesWithDistances,
        toDisplay: action.orderedPharmaciesWithDistances,
        toDisplayInBottomSheet: action.orderedPharmaciesWithDistances,
      };
      return obj;

    case SEARCH_PHARMACIES:
      let search_query = action.data.toLowerCase();
      let pharmaciesThatMatch = state.pharmacies.filter((pharmacy) => {
        return pharmacy.name.toLowerCase().includes(search_query);
      });
      return {
        ...state,
        toDisplayInBottomSheet: pharmaciesThatMatch,
      };
    // case APPLY_FILTER:
    //   const filter: string = action.data.toLowerCase();
    //   if (!filter) {
    //     return {
    //       ...state,
    //       toDisplay: state.all,
    //       toDisplayInBottomSheet: state.all,
    //     };
    //   }
    //   const filtered = state.all.filter((pharmacy) => {
    //     return pharmacy.flat_name.toLowerCase().includes(filter);
    //   });
    //   return {
    //     ...state,
    //     toDisplay: filtered,
    //     toDisplayInBottomSheet: filtered,
    //   };

    case CHANGE_DISPLAY_MODE:
      const mode = action.data;
      if (mode == "All") {
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
      return {
        ...state,
        all: pharmacies,
        toDisplay: pharmacies,
        toDisplayInBottomSheet: pharmacies,
      };
    default:
      return { ...state };
  }
};
