import { useContext, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { PharmaciesContext, PharmaciesContextInterface } from "../contexts/pharmaciesContext";


const LeafletMap = () => {

    // get pharmacies from context

    const { pharmacies } = useContext(PharmaciesContext) as PharmaciesContextInterface



    if (!pharmacies.length) return (<div>Loading...</div>)


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


        {pharmacies && pharmacies.map((pharmacy) => {
            return <Marker
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


export default LeafletMap;