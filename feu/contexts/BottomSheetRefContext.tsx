import bottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet";
import React, {
    createContext, ReactNode, RefObject, useRef
} from "react";

interface BottomSheetRefProviderProps {
    children?: JSX.Element | JSX.Element[] | ReactNode;
}

interface BottomSheetRefContextType {
    bottomSheetRef: RefObject<bottomSheet> | null;
}



export const BottomSheetRefContext = createContext<BottomSheetRefContextType>(
    { bottomSheetRef: null }
)


export const BottomSheetRefContextProvider: React.FC<BottomSheetRefProviderProps> = ({ children }) => {

    const bottomSheetRef = useRef<bottomSheet>(null);

    return <BottomSheetRefContext.Provider value={{ bottomSheetRef }}>
        {children}
    </BottomSheetRefContext.Provider>
}