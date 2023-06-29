import React from "react"
import { MapContainer, Marker, TileLayer } from "react-leaflet"


interface props {
    latitude: number,
    longitude: number
}

const SinglePharmacyLeafletMap: React.FC<props> = ({ latitude, longitude }) => {

    const center = (latitude != 0 && longitude != 0)
        ? [latitude, longitude]
        : [0, 0]

    return (
        <MapContainer
            center={[latitude, longitude]}
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


            <Marker
                position={[latitude, longitude]}


            >
                {/* <Popup>
                    {pharmacy.name}

                </Popup> */}
            </Marker>



        </MapContainer>
    )
}

export default SinglePharmacyLeafletMap