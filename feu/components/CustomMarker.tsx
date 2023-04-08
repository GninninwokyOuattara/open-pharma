import React from 'react'
import { Image } from 'react-native'
import { Marker } from 'react-native-maps'

interface Props {
    id: any,
    coordinate: {
        latitude: number,
        longitude: number
    },
    open: boolean,
}

let CustomMarker: React.FC<Props> = ({ id, coordinate, open }) => {

    return (
        // <Marker
        //     key={id}
        //     coordinate={coordinate}
        //     pinColor={open ? "#a0f20c" : "red"}
        //     tracksViewChanges={false}
        // />
        <Marker
            key={id}
            coordinate={{
                latitude: +coordinate.latitude,
                longitude: +coordinate.longitude,
            }}
            pinColor={open ? "#a0f20c" : "red"}

        >

            <Image source={require("../assets/open.png")} style={{ height: 40, width: 20 }} />

        </Marker>

    )
}

// export default CustomMarker = React.memo(CustomMarker)

export default CustomMarker