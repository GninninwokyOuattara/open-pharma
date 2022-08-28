import React from 'react'
import { Marker } from 'react-native-maps'

interface Props {
    key: any,
    coordinate: {
        latitude: number,
        longitude: number
    },
    open: boolean,
}

let CustomMarker: React.FC<Props> = ({ key, coordinate, open }) => {
    return (
        <Marker
            key={key}
            coordinate={coordinate}
            pinColor={open ? "#a0f20c" : "red"}
            tracksViewChanges={false}
        />

    )
}

export default CustomMarker = React.memo(CustomMarker)