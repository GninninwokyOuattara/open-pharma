import { View, Text, StyleSheet } from "react-native";
import React, { useMemo } from "react";
import { InformationScreenType } from "../../../../types/screenTypes";
import usePharmaciesData from "../../../../hooks/usePharmaciesData";
import { useSelector } from "react-redux";

const Screen2: React.FC<InformationScreenType> = ({ navigation, route }) => {
    // const pharmaciesDatas = usePharmaciesData();
    const pharmacy = route.params.pharmacy;
    // const pharmacie = useMemo(
    //     () =>
    //         pharmaciesDatas.find(
    //             (pharmacie) => (pharmacie.Id = route.params.pharmacieId)
    //         ),
    //     [route.params.pharmacieId]
    // );

    return (
        <View style={styles.container}>
            {/* <Text>{pharmacie ? pharmacie.Localisation : "Fetching"}</Text> */}
            <Text>{pharmacy.Id}</Text>
            <Text>{pharmacy.Nom}</Text>
            <Text>{pharmacy.Commune}</Text>
            <Text>{pharmacy.Localisation}</Text>
            <Text>{pharmacy.Numero}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Screen2;
