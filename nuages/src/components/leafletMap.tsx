import { useContext } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
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
    </MapContainer>
}


export default LeafletMap;