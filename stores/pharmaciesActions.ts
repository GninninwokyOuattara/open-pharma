import axios from "axios";
import { PROJECT_ENDPOINT, ALL_PHARMACIES } from "@env";
import { FETCH_ALL_PHARMACIES, FETCH_OPEN_PHARMACIES } from "./actions";
import { Pharmacy, FireBaseResponseObject } from "../types/dataTypes";

const extractFirebaseData = (
    firebaseResponseObject: FireBaseResponseObject
) => {
    const dataKey = Object.keys(firebaseResponseObject)[0];
    const data = firebaseResponseObject[dataKey];
    return data;
};

export const fetchAllPharmacies = () => {
    return async (dispatch: any) => {
        let res: any;
        let data: Pharmacy[];
        try {
            res = await axios.get(`${PROJECT_ENDPOINT}${ALL_PHARMACIES}.json`);
            data = extractFirebaseData(res.data);
        } catch (error) {
            throw error;
        }

        dispatch({
            type: FETCH_ALL_PHARMACIES,
            data: data,
        });
    };
};
