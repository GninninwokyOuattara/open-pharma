import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";

const Screen1: React.FC<any> = ({ navigation }) => {
    return (
        <>
            {/* <View style={styles.container}> */}
            <Text>Screen1</Text>
            <Button
                title="Click Me"
                onPress={() => {
                    navigation.navigate("Screen2");
                }}
            />
            {/* </View> */}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "red",
        opacity: 0.5,
    },
});

export default Screen1;
