import { getUsersPharmaciesList } from "@/api/pharmaciesApis";
import { useWindowWidth } from "@/contexts/windowWidthContext";
import { useQuery } from "@tanstack/react-query";
import L from "leaflet";
import { useMemo } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const LeafletMap = () => {

    const { sm } = useWindowWidth()
    const { data } = useQuery({
        queryKey: ["user-pharmacies"],
        queryFn: () => getUsersPharmaciesList()
    })

    let openPharmacies = useMemo(() => {
        return data?.data?.filter((pharmacy) => pharmacy.open)
    }, [data])

    let normalPharmacies = useMemo(() => {
        return data?.data?.filter((pharmacy) => !pharmacy.open)
    }, [data])

    console.log("data leaflet", data?.data)
    const openIcon = L.icon({
        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
        shadowSize: [41, 41]
    })


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

                    {
                        openPharmacies?.map((pharmacy) => {
                            return (
                                <Marker
                                    key={pharmacy.id}
                                    position={[pharmacy.coordinates.latitude, pharmacy.coordinates.longitude]}
                                    icon={openIcon}

                                >

                                    <Popup>{pharmacy.name}</Popup>

                                </Marker>
                            )
                        })
                    }

                    {
                        normalPharmacies?.map((pharmacy) => {
                            return (
                                <Marker
                                    key={pharmacy.id}
                                    position={[pharmacy.coordinates.latitude, pharmacy.coordinates.longitude]}
                                >
                                    <Popup>{pharmacy.name}</Popup>

                                </Marker>
                            )
                        })
                    }



                </MapContainer>
            </div>


        </div>

    )
}

export default LeafletMap