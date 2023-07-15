import React from 'react'
import { Image } from 'react-native'
import { Marker } from 'react-native-maps'
import Pulse from './utility-components/Pulse'
import SpinningDashedCircle from './utility-components/SpinningDashedCircle'

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

let CustomMarker: React.FC<Props> = React.memo(({ id, coordinate, open, title, selected }) => {

    if (selected) {
        let color: "green" | "orange" = open ? "green" : "orange"

        return (
            <Marker
                title={title}
                key={id}
                coordinate={{
                    latitude: +coordinate.latitude,
                    longitude: +coordinate.longitude,
                }}

            >

                {/* <Pulse color='blue' dotSize={15} /> */}
                <SpinningDashedCircle color={color} />


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
            title={title}
            coordinate={{
                latitude: +coordinate.latitude,
                longitude: +coordinate.longitude,
            }}
            pinColor={open ? "#a0f20c" : "red"}

        >

            <Image source={require("../assets/currentlyOpen.png")} />

        </Marker>

    )
})

// export default CustomMarker = React.memo(CustomMarker)

export default CustomMarker