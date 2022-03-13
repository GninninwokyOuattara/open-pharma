import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Pharmacy } from "./dataTypes";

export type BottomSheetStackParamList = {
    Pharmacies: undefined;
    Information: { pharmacy: Pharmacy };
};

export type PharmaciesScreenType = NativeStackScreenProps<
    BottomSheetStackParamList,
    "Pharmacies"
>;

export type InformationScreenType = NativeStackScreenProps<
    BottomSheetStackParamList,
    "Information"
>;
