import { View, Text, TextStyle, StyleProp, StyleSheet } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";

interface Props {
    text: string;
    textStyle?: StyleProp<TextStyle>;
    type: string;
    name: string;
    size?: number;
    color?: string;
    iconPosition?: "left" | "right";
}

const TextWithIcons: React.FC<Props> = ({
    name,
    type,
    size,
    color,
    text,
    textStyle,
    iconPosition,
}) => {
    const iconPos: { flexDirection?: any } = {};
    iconPosition == "right" ? (iconPos.flexDirection = "row-reverse") : null;
    return (
        <View style={[styles.container, iconPos]}>
            <Icon
                name={name}
                type={type}
                size={size || 25}
                color={color || "#000"}
                tvParallaxProperties={undefined}
            />
            <Text style={[textStyle]}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
});

export default TextWithIcons;
