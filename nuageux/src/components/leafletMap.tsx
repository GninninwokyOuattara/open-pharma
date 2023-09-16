import { MapContainer, TileLayer } from "react-leaflet";

const LeafletMap = () => {


    return (
        <div id='map' className="w-full shadow rounded-md">
            <MapContainer
                center={[7.539989, -5.54708]}
                zoom={6}
                scrollWheelZoom={false}

                style={{
                    height: "100%",

                }}
            >
                <TileLayer
                    url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                    subdomains={['mt0', 'mt1', 'mt2', 'mt3']} // Google Maps subdomains
                    attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
                />



            </MapContainer>

        </div>

    )
}

export default LeafletMap