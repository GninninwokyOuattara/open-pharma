import { TouchableWithoutFeedback } from "@gorhom/bottom-sheet";
import React from "react";
import {
    StyleSheet, Text, View
} from "react-native";
import ShadowAround from "../../utility-components/ShadowAround";

interface Data {
    id: string;
    pharmacyName: string;
    status?: "Ouvert" | "Fermé" | "Ferme bientot";
}

interface Props {
    data: Data;
    onPress?: () => void;
}

const PharmaItemLite: React.FC<Props> = ({ data, onPress }) => {
    return (
        <ShadowAround
            shadowStyles={{
                shadowColor: "#C0AF96",
                shadowOffset: { width: 0, height: 0 },
            }}
        >
            <TouchableWithoutFeedback onPress={() => onPress && onPress()}>
                <View style={styles.container}>
                    {/* <View style={styles.pulseContainer}>
                        <Pulse
                            color={
                                data.status == "Ouvert"
                                    ? "green"
                                    : data.status == "Fermé"
                                    ? "red"
                                    : "orange"
                            }
                        />
                    </View> */}
                    <View style={[styles.contentContainer]}>
                        <Text style={styles.title}>{data.pharmacyName}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </ShadowAround>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 50,
        backgroundColor: "#FDF2E3",
        borderRadius: 15,
        padding: 15,
        marginVertical: 10,

        flexDirection: "row",
        justifyContent: "flex-start",
    },

    pulseContainer: {
        marginRight: 15,
        alignSelf: "center",
    },
    contentContainer: {
        flex: 1,
        justifyContent: "space-between",
        alignSelf: "center",
    },
    title: {
        fontWeight: "700",
        fontSize: 14,
    },
});

export default PharmaItemLite;
