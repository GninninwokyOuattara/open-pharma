import { useWindowWidth } from "@/contexts/windowWidthContext";
import { MapContainer, TileLayer } from "react-leaflet";

const LeafletMap = () => {

    const { sm } = useWindowWidth()


    return (
        <div id='map' className="w-full h-full flex flex-col shadow rounded-md bg-appPrimary">

            <div className="w-full flex-grow rounded-md overflow-hidden">
                <MapContainer
                    center={[7.539989, -5.54708]}
                    zoom={sm ? 5.5 : 6}
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


        </div>

    )
}

export default LeafletMap