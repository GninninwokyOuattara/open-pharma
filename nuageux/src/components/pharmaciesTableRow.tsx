import { usePharmacyDialog } from '@/contexts/pharmacyDialogContext'
import { PharmacyData } from '@/types/dataTypes'
import React from 'react'
import { CiLocationOn } from 'react-icons/ci'
import { Badge } from './ui/badge'

const PharmaciesTableRow: React.FC<{ data: PharmacyData }> = ({ data }) => {

    const { openModalForPharmacyWithId } = usePharmacyDialog()



    return (

        <div className="flex flex-row hover:bg-appPrimary cursor-pointer  h-20 p-2 " onClick={() => openModalForPharmacyWithId(data.id)}>

            <div className="flex flex-row w-full lg:w-1/2 align-center ">
                <div className="flex flex-col  w-full md:w-96 justify-center" >
                    <p>{data.name}</p>

                    {/* {data.zone &&
                        <Badge variant={"secondary"} className="lg:hidden text-appOrange bg-orange-50  w-fit">{data.zone}</Badge>

                    } */}

                    {data.zone &&
                        <>
                            <Badge id="badgeSm" variant={"secondary"} className="md:hidden text-appOrange bg-orange-50 w-fit">{data.zone.length > 19 ? data.zone.substring(0, 19) + "..." : data.zone}</Badge>

                            <Badge id="badgeMd" variant={"secondary"} className="hidden md:flex lg:hidden text-appOrange bg-orange-50 w-fit">{data.zone}</Badge>
                        </>

                    }



                </div>

                <div id="rowCoordinates" className={`hidden md:flex w-64 text-appGray font-medium items-center gap-2 text-xs lg:hidden  ${data.coordinates.latitude == 0 && data.coordinates.longitude == 0 ? "text-red-500" : ""}`}>
                    <CiLocationOn size={15} />
                    <div>
                        {data.coordinates.latitude}, {data.coordinates.longitude}
                    </div>

                </div>


                <div className=' lg:hidden place-self-center w-auto '>
                    <div className='w-16 flex items-center justify-center '>

                        {
                            data.open && <Badge className='text-green-500 h-fit self-center bg-green-100'>Open</Badge>
                        }
                    </div>
                </div>




            </div>


            <div id="zone" className="hidden lg:flex lg:w-1/2 items-center text-appOrange">
                {/* {data.zone &&
                    <p className="text-appOrange">{data.zone}</p>

                } */}
                {data.zone}
            </div>


            <div id="coordinates" className={`hidden lg:flex lg:w-72 text-appGray font-medium items-center gap-2 ${data.coordinates.latitude == 0 && data.coordinates.longitude == 0 ? "text-red-500" : ""}`}>
                <CiLocationOn size={15} />
                <p>
                    {data.coordinates.latitude}, {data.coordinates.longitude}
                </p>

            </div>

            <div id="openStatus" className='hidden lg:flex lg:w-16'>
                {
                    data.open && <Badge className='text-green-500 h-fit self-center bg-green-100'>Open</Badge>
                }
            </div>

        </div>
    )
}

export default PharmaciesTableRow 