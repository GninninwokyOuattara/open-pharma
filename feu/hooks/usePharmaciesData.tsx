import { View, Text } from "react-native";
import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootReducerType } from "../types/dataTypes";
import { fetchLocalPharmaciesData } from "../stores/pharmaciesActions";
import useLocation from "./useLocation";

const usePharmaciesData = () => {
    const dispatch = useDispatch();
    const { location, errorMsg } = useLocation();

    const [all, toDisplay] = useSelector((state: RootReducerType) => {
        return [state.pharmacies.all, state.pharmacies.toDisplay];
    });

    useEffect(() => {
        // dispatch(fetchAllPharmacies());
        dispatch(fetchLocalPharmaciesData(location));
    }, [dispatch]);

    return toDisplay;
};

export default usePharmaciesData;
