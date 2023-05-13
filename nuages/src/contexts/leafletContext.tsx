import React, { createContext, useCallback, useMemo, useState } from "react";
import { PharmacyFullState } from "../types";


export interface LeafletMapContextInterface {
    pharmacyFocusedOnMap: PharmacyFullState | null;
    setPharmacyFocusedOnMap: React.Dispatch<React.SetStateAction<PharmacyFullState | null>>;
    setFocus: (pharmacy: PharmacyFullState) => void;
}



export const LeafletMapContext = createContext<LeafletMapContextInterface | null>(null);



export const LeafletMapContextProvider = ({ children }: any) => {

    // STATES

    const [pharmacyFocusedOnMap, setPharmacyFocusedOnMap] = useState<PharmacyFullState | null>(null)

    const setFocus = useCallback((pharmacy: PharmacyFullState) => {
        console.log("Setting focus on ", pharmacy.name)
        setPharmacyFocusedOnMap((prev) => {
            console.log("setting focus from ", prev?.name, " to ", pharmacy.name)
            return pharmacy
        })
    }, [setPharmacyFocusedOnMap])

    const value = useMemo(() => {
        return {
            pharmacyFocusedOnMap,
            setPharmacyFocusedOnMap,
            setFocus
        }
    }, [
        pharmacyFocusedOnMap,
        setPharmacyFocusedOnMap,
        setFocus
    ])
    return (
        <LeafletMapContext.Provider value={value}>
            {children}
        </LeafletMapContext.Provider>
    )
}