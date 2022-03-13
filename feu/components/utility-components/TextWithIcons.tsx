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
    marginLeft?: number;
    marginRight?: number;
}

const TextWithIcons: React.FC<Props> = ({
    name,
    type,
    size,
    color,
    text,
    textStyle,
    iconPosition,
    marginLeft,
    marginRight,
}) => {
    const iconPos: { flexDirection?: any } = {};
    iconPosition == "right" ? (iconPos.flexDirection = "row-reverse") : null;
    const margin = {
        marginLeft: marginLeft ? marginLeft : 0,
        marginRight: marginRight ? marginRight : 0,
    };
    return (
        <View style={[styles.container, iconPos, margin]}>
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
