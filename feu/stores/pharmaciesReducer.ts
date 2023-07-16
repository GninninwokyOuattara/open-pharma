import _ from "lodash";
import {
  Pharmacy,
  PharmacyFullState,
  RootReducerType,
} from "../types/dataTypes";
import {
  GET_OPH_CURRENT_STATE,
  SEARCH,
  SEARCH_PHARMACIES,
  SET_DISPLAY_MODE,
  SET_IS_LOCATION_PERMISSION_GRANTED,
  SET_LOADING_STATE,
  SET_SORT_MODE,
  UPDATE_PHARMACIES_DISTANCES,
  UPDATE_RELATIVE_DISTANCES,
} from "./actions";
import { calculateDistanceToUser } from "./pharmaciesActions";

interface PharmaciesState {
  all: Pharmacy[];
  open: Pharmacy[];
  toDisplay: Pharmacy[];
  toDisplayInBottomSheet: PharmacyFullState[];
  toDisplayInMap: Pharmacy[];
  pharmacies: PharmacyFullState[];
}

const pharmaciesState: RootReducerType["pharmacies"] = {
  isLocationPermissionGranted: false,
  isSearchingPharmacy: false,
  search: "",
  isLoading: false,
  displayMode: "OpenOnly",
  sortMode: "Proximity",
  all: [],
  open: [],
  toDisplay: [],
  toDisplayInBottomSheet: [],
  toDisplayInMap: [],
  pharmacies: [],
};

export default (state = pharmaciesState, action: any) => {
  switch (action.type) {
    case GET_OPH_CURRENT_STATE:
      // Retrieve the most recent data from the server

      let ophCurrentState: PharmacyFullState[] = action.data.pharmacies;
      let location = action.data.location;
      // If i have to do something with the data, i do it here
      if (location) {
        // If the user has given his location, we calculate the distance to the user for each pharmacy
        ophCurrentState = calculateDistanceToUser(ophCurrentState, location);
      }

      if (state.isLocationPermissionGranted && state.sortMode === "Proximity") {
        // sort by distance
        ophCurrentState = _.sortBy(ophCurrentState, ["distanceToUser"]);
      }

      // if (state.displayMode === "OpenOnly") {
      //   // Filter to retrive only open pharmacies
      //   ophCurrentState = ophCurrentState.filter((pharmacy) => pharmacy.open);
      // }

      return {
        ...state,
        pharmacies: ophCurrentState,
        toDisplayInBottomSheet: ophCurrentState,
        isLoading: false,
      };
    case UPDATE_RELATIVE_DISTANCES:
      let userLocation = action.data;
      let pharmaciesWithUpdatedDistances: PharmacyFullState[] =
        calculateDistanceToUser(state.pharmacies, userLocation);
      if (state.isLocationPermissionGranted && state.sortMode === "Proximity") {
        // sort by distance
        pharmaciesWithUpdatedDistances = _.sortBy(
          pharmaciesWithUpdatedDistances,
          ["distanceToUser"]
        );
      }

      // if ((state.sortMode = "Proximity")) {
      //   pharmaciesWithDistance = _.sortBy(pharmaciesWithDistance, [
      //     "distanceToUser",
      //   ]);
      // }
      return {
        ...state,
        toDisplayInBottomSheet: pharmaciesWithUpdatedDistances,
        pharmacies: pharmaciesWithUpdatedDistances,
      };

    case SEARCH_PHARMACIES:
      // Search pharmacies corresponding to the query
      let search_query = action.data.toLowerCase();
      let pharmaciesThatMatch = state.pharmacies.filter((pharmacy) => {
        return pharmacy.name.toLowerCase().includes(search_query);
      });
      return {
        ...state,
        toDisplayInBottomSheet: pharmaciesThatMatch,
        isSearchingPharmacy: search_query.length > 0,
        isLoading: false,
      };

    case SEARCH:
      // Search pharmacies corresponding to the query
      console.log("SEARCHING", action.data);
      return {
        ...state,
        search: action.data,
        isLoading: false,
      };

    case UPDATE_PHARMACIES_DISTANCES:
      // Update the distances of the pharmacies
      const pharmacies = action.data.pharmacies;
      return {
        ...state,
        toDisplayInBottomSheet: pharmacies,
      };

    case SET_SORT_MODE:
      const order = action.data;
      return {
        ...state,
        sortMode: order,
      };

    ////////////////////////////
    // CASE RELATED TO STATES
    ////////////////////////////
    case SET_LOADING_STATE:
      // Manage the loading state
      let desired_loading_state = action.data;
      return {
        ...state,
        isLoading: desired_loading_state,
      };

    case SET_IS_LOCATION_PERMISSION_GRANTED:
      // Manage the location permission state
      let is_permitted = action.data;
      return {
        ...state,
        isLocationPermissionGranted: is_permitted,
      };

    case SET_DISPLAY_MODE:
      // Manage the display mode
      let display_mode = action.data;
      return {
        ...state,
        displayMode: display_mode,
      };

    default:
      return { ...state };
  }
};
