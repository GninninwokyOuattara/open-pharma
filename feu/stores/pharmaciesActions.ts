import axios from "axios";
import uuid from "react-native-uuid";
import {
    PROJECT_ENDPOINT,
    ALL_PHARMACIES,
    OPEN_PHARMACIES,
    PHARMACIES,
} from "@env";
import {
    APPLY_FILTER,
    FETCH_ALL_PHARMACIES,
    FETCH_OPEN_PHARMACIES,
    UPDATE_RELATIVE_DISTANCES,
} from "./actions";
import {
    Pharmacy,
    FireBaseResponseObject,
    Pharmacies,
} from "../types/dataTypes";
import { calculateDistance } from "../utils/calculateDistance";
import usePharmaciesData from "../hooks/usePharmaciesData";
import { LocationObject } from "expo-location";

const extractFirebaseData = (
    firebaseResponseObject: FireBaseResponseObject
) => {
    const dataKey = Object.keys(firebaseResponseObject)[0];
    const data = firebaseResponseObject[dataKey];
    return data;
};

// export const fetchLocalPharmaciesData = (
//     locationData: LocationObject | null
// ) => {
//     return async (dispatch: any) => {
//         let pharmacies: Pharmacy[] =
//             await require("./../dummy_data/pharmacies_with_coordinates_save.json");

//         if (locationData) {
//             const userPosition = `${locationData.coords.latitude}, ${locationData.coords.longitude}`;

//             pharmacies.map((pharmacie) => {
//                 // THIS WILL NEED TO BE REFACTORED AS IT IS ONLY USED BECAUSE CURRETLY FROM FIREBASE THE LOCATION DATA ARE INCORRECT, SO I GO THROUGH ALL THIS JUST TO HAVE SOMETHING TO WORK WITH
//                 let positionArray = pharmacie.Position.split(",").map((e) =>
//                     e.trim()
//                 );
//                 positionArray[1] = "-" + positionArray[1]; // <- Line where I forcefully add a - to the longitude
//                 let pharmaciePosition = positionArray.join(",");
//                 const distance = calculateDistance(
//                     userPosition,
//                     pharmaciePosition
//                 );
//                 pharmacie.Distance = distance;
//                 return pharmacie;
//             });
//         }

//         dispatch({
//             type: FETCH_ALL_PHARMACIES,
//             data: pharmacies,
//         });
//     };
// };

export const fetchAllPharmacies = () => {
    return async (dispatch: any) => {
        let res: any;
        let pharmaciesDatas: Pharmacies;
        try {
            res = await axios.get(`${PROJECT_ENDPOINT}${PHARMACIES}.json`);
            // Transform result from a hash in an array
            pharmaciesDatas = Object.values(res.data);

            // Remove pharmacies without coordinates in the list
            pharmaciesDatas = pharmaciesDatas.filter(
                (pharmacy) => !!pharmacy.coordinates == true
            );

            // Add an uuid to each element
            pharmaciesDatas = pharmaciesDatas.map((pharmacy) => ({
                ...pharmacy,
                phid: uuid.v4() as string,
            }));

            // data = extractFirebaseData(res.data);
        } catch (error) {
            throw error;
        }

        dispatch({
            type: FETCH_ALL_PHARMACIES,
            pharmaciesDatas: pharmaciesDatas,
        });
    };
};

// export const calculateRelativeDistances = (
//     pharmacies: Pharmacy[],
//     userPosition: string
// ) => {
//     return async (dispatch: any) => {
//         pharmacies.map((pharmacie) => {
//             // THIS WILL NEED TO BE REFACTORED AS IT IS ONLY USED BECAUSE CURRETLY FROM FIREBASE THE LOCATION DATA ARE INCORRECT, SO I GO THROUGH ALL THIS JUST TO HAVE SOMETHING TO WORK WITH
//             let positionArray = pharmacie.Position.split(",").map((e) =>
//                 e.trim()
//             );
//             positionArray[1] = "-" + positionArray[1]; // <- Line where I forcefully add a - to the longitude
//             let pharmaciePosition = positionArray.join(",");
//             const distance = calculateDistance(userPosition, pharmaciePosition);
//             pharmacie.Distance = distance;
//             return pharmacie;
//         });

//         dispatch({
//             type: UPDATE_RELATIVE_DISTANCES,
//             data: pharmacies,
//         });
//     };
// };

export const applyFilter = (filter: string) => {
    return async (dispatch: any) => {
        dispatch({
            type: APPLY_FILTER,
            data: filter,
        });
    };
};
