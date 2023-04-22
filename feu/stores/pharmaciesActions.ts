import { BACKEND_ADDRESS, PHARMACIES, PROJECT_ENDPOINT, UPDATE } from "@env";
import axios, { AxiosResponse } from "axios";
import {
  DBPharmacy,
  FireBaseResponseObject,
  Pharmacies,
  PharmacyFullState,
} from "../types/dataTypes";
import {
  APPLY_FILTER,
  FETCH_ALL_PHARMACIES,
  GET_OPH_CURRENT_STATE,
  SET_LOADING_STATE,
} from "./actions";

import { LocationObject } from "expo-location";
import { getAllPharmacies, insertPharmacie } from "../database/db";
import { calculateDistance } from "../utils/calculateDistance";
import { convertToReadableDistance } from "../utils/convertToReadableDistance";
import { parsePharmacy } from "../utils/datasMorphing";

const extractFirebaseData = (
  firebaseResponseObject: FireBaseResponseObject
) => {
  const dataKey = Object.keys(firebaseResponseObject)[0];
  const data = firebaseResponseObject[dataKey];
  return data;
};

export const getCurrentUpdateVersion = async () => {
  try {
    let response = await axios.get(`${PROJECT_ENDPOINT}${UPDATE}.json`);
    return response.data as string;
  } catch (error) {
    throw error;
  }
};

export const fetchAllPharmacies = (location?: LocationObject) => {
  return async (dispatch: any) => {
    let response: AxiosResponse<any, any>;
    console.log("-- Fetching pharmacies...");
    try {
      // get pharmacies from database
      response = await axios.get(`${PROJECT_ENDPOINT}${PHARMACIES}.json`);
    } catch (error) {
      throw error;
    }
    //The responsee comes as an object of object, we have to convert it into an array of object
    let pharmaciesDatas: Pharmacies = Object.values(response.data);

    // Then we insert them into the database
    console.log("-- Inserting into database");
    for (let i = 0; i < pharmaciesDatas.length; i++) {
      try {
        await insertPharmacie(pharmaciesDatas[i]);
      } catch (error) {
        throw error;
      }
    }

    console.log("-- Getting pharmacies from db...");
    let pharmacies: DBPharmacy[] = await getAllPharmacies();

    console.log("-- Parsing pharmacies into workable format...");
    pharmaciesDatas = pharmacies.map((pharmacy) => parsePharmacy(pharmacy));

    console.log("-- Dispatching action...");
    dispatch({
      type: FETCH_ALL_PHARMACIES,
      pharmaciesDatas: pharmaciesDatas,
    });
  };
};

// Calculate user proximity to pharmacies
// If isProximityMode is se to True, the resulting array will be sorted by order of proximity
// export const calculatePharmaciesProximityToUser = (
//   userCoordinate: any,
//   pharmacies: Pharmacies,
//   isProximityMode: boolean
// ) => {
//   return async (dispatch: any) => {
//     // Calculate the distance between the user and the location of each pharmacies
//     if (!userCoordinate || !pharmacies) return;

//     pharmacies = pharmacies.map((pharmacy) => {
//       let distanceToUserReadable = calculateDistance(
//         [userCoordinate.coords.latitude, userCoordinate.coords.longitude],
//         [+pharmacy.coordinates.lat, +pharmacy.coordinates.lng]
//       );
//       return {
//         ...pharmacy,
//         distance: convertToReadableDistance(distanceToUserReadable),
//         distanceRaw: distanceToUserReadable,
//       };
//     });

//     // Sort by distance ASC if proximityMode is true
//     if (isProximityMode) pharmacies = _.sortBy(pharmacies, ["distanceRaw"]);

//     //Dispatch Action
//     dispatch({
//       type: UPDATE_RELATIVE_DISTANCES,
//       orderedPharmaciesWithDistances: pharmacies,
//     });
//   };
// };

// Used for search, filter pharmacies based on entered string
export const applyFilter = (filter: string) => {
  return async (dispatch: any) => {
    dispatch({
      type: APPLY_FILTER,
      data: filter,
    });
  };
};

// Change display mode
// All -> Display everything
// OpenOnly -> Display only open pharmacies
// export const changeDisplayMode = (mode: "All" | "OpenOnly") => {
//   return async (dispatch: any) => {
//     dispatch({
//       type: CHANGE_DISPLAY_MODE,
//       data: mode,
//     });
//   };
// };

// Change pharmacies display order in bottomsheet
// export const changePharmacyDisplayOrder = (
//   pharmacies: Pharmacies,
//   mode: "Ascendant" | "Descendant" | "A proximité"
// ) => {
//   return async (dispatch: any) => {
//     let orderedPharmacies: Pharmacies;

//     if (mode === "Ascendant") {
//       orderedPharmacies = _.orderBy(pharmacies, "name", "asc");
//     } else if (mode === "Descendant") {
//       orderedPharmacies = _.orderBy(pharmacies, "name", "desc");
//     } else if (mode === "A proximité") {
//       orderedPharmacies = _.orderBy(pharmacies, ["distanceRaw"]);
//     } else {
//       throw new Error("Invalid mode");
//     }
//     dispatch({
//       type: CHANGE_ORDER,
//       data: orderedPharmacies,
//     });
//   };
// };

export const getOpenPharmacies = () => {
  // REtrieve the list of currently open pharmacies from django backend
  // url : http://localhost:8000/api/open-pharmacies/

  return async (dispatch: any) => {
    try {
      let response: any = await axios.get(
        `http://localhost:8000/api/open-pharmacies/`
      );
      dispatch({
        type: "FETCH_ALL_PHARMACIES",
        data: response.data,
      });
    } catch (error) {
      throw error;
    }
  };
};

export const getOpenPharmaPharmaciesDatas = (
  location: LocationObject | null
) => {
  // This function is used to fetch from the oph backend the list complete list of pharmacies and their states (open or closed).
  return async (dispatch: any) => {
    dispatch({
      type: SET_LOADING_STATE,
      data: true,
    });

    try {
      let response = await axios.get<PharmacyFullState[]>(
        `${BACKEND_ADDRESS}/api/pharmacies-current-state/`
      );
      return dispatch({
        type: GET_OPH_CURRENT_STATE,
        data: { pharmacies: response.data, location: location },
      });
    } catch (error) {
      // throw error;
      dispatch({
        type: SET_LOADING_STATE,
        data: false,
      });
    }
  };
};

////////////////////////
/// UTILITY METHODS ////
////////////////////////

export const calculateDistanceToUser = (
  pharmacies: PharmacyFullState[],
  userLocation: LocationObject
) => {
  return pharmacies.map((pharmacy) => {
    let distanceToUser = calculateDistance(
      [userLocation.coords.latitude, userLocation.coords.longitude],
      [+pharmacy.coordinates.latitude, +pharmacy.coordinates.longitude]
    );
    return {
      ...pharmacy,
      distanceToUser: distanceToUser,
      distanceToUserReadable: convertToReadableDistance(distanceToUser),
    };
  });
};
