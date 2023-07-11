import React, { ReactNode, useCallback, useContext } from 'react';
import { useAnimatedProps, useSharedValue } from 'react-native-reanimated';
import { useAppMapRefContextRef } from './AppMapRefContext';



interface AppMapAnimationContextInterface {
    setbottomOffset: (value: number) => void,
    mapDynamicBottomOffsetValue: Partial<{
        mapPadding: {
            top: number;
            bottom: number;
            left: number;
            right: number;
        };
    }>
}

const AppMapAnimationContext = React.createContext<AppMapAnimationContextInterface>({
    setbottomOffset: () => {

    },
    mapDynamicBottomOffsetValue: {
        mapPadding: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        }
    }

})
export const AppMapAnimationContextProvider: React.FC<{ children: JSX.Element | JSX.Element[] | ReactNode }> = ({ children }) => {

    const { mapRef } = useAppMapRefContextRef();

    const bottomOffset = useSharedValue(0);

    const mapDynamicBottomOffsetValue = useAnimatedProps(() => ({
        mapPadding: {
            top: 0,
            bottom: bottomOffset.value,
            left: 0,
            right: 0
        }
    }))



    const setbottomOffset = useCallback((value: number) => {
        bottomOffset.value = value;
        triggerMapAnimation()
    }, [bottomOffset])

    const triggerMapAnimation = () => {
        setTimeout(() => {
            if (mapRef && mapRef.current) {
                mapRef.current.animateCamera({
                    center: {
                        latitude: 37.78825,
                        longitude: -122.4324,
                    },
                    //    zoom: 14,
                }, {
                    duration: 1000
                })
            }
        }, 50)

    }


    return (
        <AppMapAnimationContext.Provider
            value={{
                setbottomOffset,
                mapDynamicBottomOffsetValue
            }}
        >
            {children}
        </AppMapAnimationContext.Provider>
    )
}

export const useAppMapAnimationContext = () => {
    return useContext(AppMapAnimationContext);
}

export default AppMapAnimationContext