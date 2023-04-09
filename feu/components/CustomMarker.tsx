import React from 'react'
import { Image } from 'react-native'
import { Marker } from 'react-native-maps'
import Pulse from './utility-components/Pulse'

interface Props {
    id: any,
    coordinate: {
        latitude: number,
        longitude: number
    },
    open: boolean,
    title: string,
    selected?: boolean
}

let CustomMarker: React.FC<Props> = ({ id, coordinate, open, title, selected }) => {
    // const { selectedMarker } = useContext(MapContext);

    // if (selectedMarker && selectedMarker === id) {
    //     console.log("Selected Marker", selectedMarker),
    //         console.log("IT IS I", title)
    // }

    if (selected) {

        return (
            <Marker
                title={title}
                key={id}
                coordinate={{
                    latitude: +coordinate.latitude,
                    longitude: +coordinate.longitude,
                }}

            >

                {/* <Image source={require("../assets/markerGreen.png")} style={{ height: 45, width: 20 }} /> */}
                <Pulse color='blue' dotSize={15} />

            </Marker>
        )
    }


    if (open) {
        return (
            <Marker
                title={title}
                key={id}
                coordinate={{
                    latitude: +coordinate.latitude,
                    longitude: +coordinate.longitude,
                }}
                pinColor={open ? "#a0f20c" : "red"}

            >

                {/* <Image source={require("../assets/markerGreen.png")} style={{ height: 45, width: 20 }} /> */}
                <Pulse color='green' dotSize={15} />

            </Marker>
        )
    }

    return (

        <Marker
            key={id}
            coordinate={{
                latitude: +coordinate.latitude,
                longitude: +coordinate.longitude,
            }}
            pinColor={open ? "#a0f20c" : "red"}

        >

            <Image source={require("../assets/markerOrange.png")} style={{ height: 45, width: 20 }} />

        </Marker>

    )
}

// export default CustomMarker = React.memo(CustomMarker)

export default CustomMarker