import { View, Text } from "react-native";
import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootReducerType } from "../types/dataTypes";
import { fetchLocalPharmaciesData } from "../stores/pharmaciesActions";

const usePharmaciesData = () => {
    const dispatch = useDispatch();
    const pharmacies = useSelector((state: RootReducerType) => {
        return state.pharmacies.all;
    });

    useEffect(() => {
        // dispatch(fetchAllPharmacies());
        dispatch(fetchLocalPharmaciesData());
    }, [dispatch]);

    return pharmacies;
};

export default usePharmaciesData;
