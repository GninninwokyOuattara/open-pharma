import { Center, Skeleton, Text } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { palette } from "../colorPalette";
import { PharmaciesContext, PharmaciesContextInterface } from "../contexts/pharmaciesContext";


const LeafletMap = () => {

    // get pharmacies from context

    const { pharmacies, isLoading } = useContext(PharmaciesContext) as PharmaciesContextInterface


    if (isLoading) return <LoadinLeafletMap />

    if (!pharmacies.length) {
        return (<Center h={"100%"} bg={palette.custom.niceOrange}>
            <Text fontSize={"2xl"} fontWeight={"bold"} color={"black"}>
                No Pharmacies to display on the map.
            </Text>

        </Center>)

    }


    return <MapContainer
        center={[pharmacies[0].latitude, pharmacies[0].longitude]}
        zoom={13}
        scrollWheelZoom={false}

        style={{
            height: "100%",

        }}
    >
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />


        {pharmacies && pharmacies.map((pharmacy, idx) => {
            return <Marker
                key={idx}
                position={[pharmacy.coordinates.latitude, pharmacy.coordinates.longitude]}


            >
                <Popup>
                    {pharmacy.name}

                </Popup>
            </Marker>
        })
        }

        <MapInteractionHandler />
    </MapContainer>
}



function MapInteractionHandler() {
    const map = useMap()
    const { pharmacyFocusedOnMap } = useContext(PharmaciesContext) as PharmaciesContextInterface

    useEffect(() => {
        if (pharmacyFocusedOnMap) {
            map.setView([pharmacyFocusedOnMap.coordinates.latitude, pharmacyFocusedOnMap.coordinates.longitude], 15, { animate: true })
        }
    }, [pharmacyFocusedOnMap])
    console.log('map center:', map.getCenter())

    return null
}


const LoadinLeafletMap = () => {
    return (

        // <Center height={"full"} bg={palette.colorHuntTheme.lightGreen}>
        //     <Spinner size={"lg"} />
        // </Center>
        <Skeleton height={"100%"} width={"100%"} />
    )
}


export default LeafletMap;