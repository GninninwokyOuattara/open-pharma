import { PHARMACIES, PROJECT_ENDPOINT, UPDATE } from "@env";
import axios, { AxiosResponse } from "axios";
import {
  DBPharmacy,
  FireBaseResponseObject,
  Pharmacies,
} from "../types/dataTypes";
import {
  APPLY_FILTER,
  CHANGE_DISPLAY_MODE,
  CHANGE_ORDER,
  FETCH_ALL_PHARMACIES,
  UPDATE_RELATIVE_DISTANCES,
} from "./actions";

import { LocationObject } from "expo-location";
import _ from "lodash";
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
    try {
      // get pharmacies from database
      response = await axios.get(`${PROJECT_ENDPOINT}${PHARMACIES}.json`);
    } catch (error) {
      throw error;
    }
    //The responsee comes as an object of object, we have to convert it into an array of object
    let pharmaciesDatas: Pharmacies = Object.values(response.data);

    // Then we insert them into the database
    for (let i = 0; i < pharmaciesDatas.length; i++) {
      try {
        await insertPharmacie(pharmaciesDatas[i]);
      } catch (error) {
        throw error;
      }
    }

    let pharmacies: DBPharmacy[] = await getAllPharmacies();

    pharmaciesDatas = pharmacies.map((pharmacy) => parsePharmacy(pharmacy));

    dispatch({
      type: FETCH_ALL_PHARMACIES,
      pharmaciesDatas: pharmaciesDatas,
    });
  };
};

// Calculate user proximity to pharmacies
// If isProximityMode is se to True, the resulting array will be sorted by order of proximity
export const calculatePharmaciesProximityToUser = (
  userCoordinate: any,
  pharmacies: Pharmacies,
  isProximityMode: boolean
) => {
  return async (dispatch: any) => {
    // Calculate the distance between the user and the location of each pharmacies
    if (!userCoordinate || !pharmacies) return;

    pharmacies = pharmacies.map((pharmacy) => {
      let distanceToUser = calculateDistance(
        [userCoordinate.coords.latitude, userCoordinate.coords.longitude],
        [+pharmacy.coordinates.lat, +pharmacy.coordinates.lng]
      );
      return {
        ...pharmacy,
        distance: convertToReadableDistance(distanceToUser),
        distanceRaw: distanceToUser,
      };
    });

    // Sort by distance ASC if proximityMode is true
    if (isProximityMode) pharmacies = _.sortBy(pharmacies, ["distanceRaw"]);

    //Dispatch Action
    dispatch({
      type: UPDATE_RELATIVE_DISTANCES,
      orderedPharmaciesWithDistances: pharmacies,
    });
  };
};

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
export const changeDisplayMode = (mode: "All" | "OpenOnly") => {
  return async (dispatch: any) => {
    dispatch({
      type: CHANGE_DISPLAY_MODE,
      data: mode,
    });
  };
};

// Change pharmacies display order in bottomsheet
export const changePharmacyDisplayOrder = (
  pharmacies: Pharmacies,
  mode: "Ascendant" | "Descendant" | "A proximité"
) => {
  return async (dispatch: any) => {
    let orderedPharmacies: Pharmacies;

    if (mode === "Ascendant") {
      orderedPharmacies = _.orderBy(pharmacies, "name", "asc");
    } else if (mode === "Descendant") {
      orderedPharmacies = _.orderBy(pharmacies, "name", "desc");
    } else if (mode === "A proximité") {
      orderedPharmacies = _.orderBy(pharmacies, ["distanceRaw"]);
    } else {
      throw new Error("Invalid mode");
    }
    dispatch({
      type: CHANGE_ORDER,
      data: orderedPharmacies,
    });
  };
};
