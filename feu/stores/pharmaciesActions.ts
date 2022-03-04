import axios from "axios";
import { PROJECT_ENDPOINT, ALL_PHARMACIES } from "@env";
import {
    FETCH_ALL_PHARMACIES,
    FETCH_OPEN_PHARMACIES,
    UPDATE_RELATIVE_DISTANCES,
} from "./actions";
import { Pharmacy, FireBaseResponseObject } from "../types/dataTypes";
import { calculateDistance } from "../utils/calculateDistance";

const extractFirebaseData = (
    firebaseResponseObject: FireBaseResponseObject
) => {
    const dataKey = Object.keys(firebaseResponseObject)[0];
    const data = firebaseResponseObject[dataKey];
    return data;
};

export const fetchLocalPharmaciesData = (a: string) => {
    return async (dispatch: any) => {
        let datas =
            await require("./../dummy_data/pharmacies_with_coordinates_save.json");
        console.log(datas);

        dispatch({
            type: FETCH_ALL_PHARMACIES,
            data: datas,
        });
    };
};

export const fetchAllPharmacies = () => {
    return async (dispatch: any) => {
        let res: any;
        let data: Pharmacy[];
        try {
            res = await axios.get(`${PROJECT_ENDPOINT}${ALL_PHARMACIES}.json`);
            data = extractFirebaseData(res.data);
        } catch (error) {
            console.log("ERROR", error);
            throw error;
        }

        dispatch({
            type: FETCH_ALL_PHARMACIES,
            data: data,
        });
    };
};

export const calculateRelativeDistances = (
    pharmacies: Pharmacy[],
    userPosition: string
) => {
    return async (dispatch: any) => {
        pharmacies.map((pharmacie) => {
            // THIS WILL NEED TO BE REFACTORED AS IT IS ONLY USED BECAUSE CURRETLY FROM FIREBASE THE LOCATION DATA ARE INCORRECT, SO I GO THROUGH ALL THIS JUST TO HAVE SOMETHING TO WORK WITH
            let positionArray = pharmacie.Position.split(",").map((e) =>
                e.trim()
            );
            positionArray[1] = "-" + positionArray[1]; // <- Line where I forcefully add a - to the longitude
            let pharmaciePosition = positionArray.join(",");
            const distance = calculateDistance(userPosition, pharmaciePosition);
            pharmacie.Distance = distance;
            return pharmacie;
        });

        dispatch({
            type: UPDATE_RELATIVE_DISTANCES,
            data: pharmacies,
        });
    };
};
