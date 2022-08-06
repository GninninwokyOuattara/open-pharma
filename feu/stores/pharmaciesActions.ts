import {
    PHARMACIES, PROJECT_ENDPOINT
} from "@env";
import axios from "axios";
import {
    DBPharmacy,
    FireBaseResponseObject,
    Pharmacies
} from "../types/dataTypes";
import {
    APPLY_FILTER,
    FETCH_ALL_PHARMACIES,
    UPDATE_PHARMACIES_DISTANCES
} from "./actions";

import { LocationObject } from "expo-location";
import { getAllPharmacies, insertPharmacie } from "../database/db";
import { parsePharmacy } from "../utils/datasMorphing";



const extractFirebaseData = (
    firebaseResponseObject: FireBaseResponseObject
) => {
    const dataKey = Object.keys(firebaseResponseObject)[0];
    const data = firebaseResponseObject[dataKey];
    return data;
};

export const fetchAllPharmacies = (location ?: LocationObject) => {
    return async (dispatch: any) => {


        //GET PHARMACIES FROM DATABASE
        let pharmaciesDatas: any;
        let pharmacies = await getAllPharmacies() as DBPharmacy[]

        if(pharmacies.length > 0) {
            pharmaciesDatas = pharmacies
        } else {
            try {
                
                // get pharmacies from database
                let response = await axios.get(`${PROJECT_ENDPOINT}${PHARMACIES}.json`);
    
                //The responsee comes as an object of object, we have to convert it into an array of object
                pharmaciesDatas = Object.values(response.data)

                // Then we insert them into the database
                for(let i = 0; i <pharmaciesDatas.length; i++) {
                    try {
                        
                        await insertPharmacie(pharmaciesDatas[i]);
                    } catch (error) {
                     console.log("ERROR", pharmaciesDatas[i]) 
                     throw error  
                    }
                }

                pharmacies = await getAllPharmacies();
                
                
            } catch (error) {
                throw error
                
            }
            
        }

        pharmaciesDatas = pharmacies.map((pharmacy) => parsePharmacy(pharmacy))
        console.log("11111", pharmaciesDatas[1])

        dispatch({
            type: FETCH_ALL_PHARMACIES,
            pharmaciesDatas: pharmaciesDatas,
        });
    };
};


const updatePharmaciesDistances = (pharmaciesDatas: Pharmacies, userCoordinate : LocationObject) => {
    return async (dispatch: any) => {

        // Work to do here....

        dispatch({
            type : UPDATE_PHARMACIES_DISTANCES,
            pharmaciesDatas: pharmaciesDatas,
        })
    }
}

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
