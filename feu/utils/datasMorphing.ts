import { DBPharmacy, Pharmacy } from "../types/dataTypes";


export const parsePharmacy = (pharmacy : DBPharmacy) : Pharmacy => {
    // Convert pharmacy once retrieved from database into a workable data format by parsing values from keys like coordinates
    return {...pharmacy, 
        open : pharmacy.open == 1? true : false, 
        coordinates : JSON.parse(pharmacy.coordinates),
        phone_numbers : pharmacy.phone_numbers ? JSON.parse(pharmacy.phone_numbers) : []
    }
}