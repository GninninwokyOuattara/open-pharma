import React, {
    createContext,
    ReactNode, RefObject,
    useContext,
    useRef
} from "react";
import MapView from "react-native-maps";



export interface AppMapRefContextRefProps {
    mapRef: RefObject<MapView> | null;



}

interface AppMapRefContextRefProviderProps {
    children?: JSX.Element | JSX.Element[] | ReactNode;
}

export const AppMapRefContextRef = createContext<AppMapRefContextRefProps>({
    mapRef: null,


});


export const AppMapRefContextRefProvider: React.FC<AppMapRefContextRefProviderProps> = ({
    children,
}) => {
    const mapRef = useRef<MapView>(null);


    return (
        <AppMapRefContextRef.Provider
            value={{ mapRef }}
        >
            {children}
        </AppMapRefContextRef.Provider>
    );
};


export const useAppMapRefContextRef = () => {
    const context = useContext(AppMapRefContextRef);
    return context;
}
