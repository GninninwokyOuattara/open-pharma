import { PharmacyData } from '@/types/dataTypes'
import React from 'react'
import { CiLocationOn } from 'react-icons/ci'
import { Badge } from './ui/badge'

const PharmaciesTableRow: React.FC<{ data: PharmacyData }> = ({ data }) => {
    // const queryClient = useQueryClient();

    // const acceptMutation = useMutation({
    //     mutationFn: () => acceptPharmacyPendingReview(data.id),
    //     onSuccess: () => {
    //         // Invalidate and refetch
    //         queryClient.invalidateQueries({ queryKey: ["pending-reviews-pharmacies"] })
    //     },
    //     onError: () => {
    //         console.log("Well Well Well it seems like something went wrong")
    //     }
    // })

    // const rejectMutation = useMutation({
    //     mutationFn: () => rejectPharmacyPendingReview(data.id),
    //     onSuccess: () => {
    //         // Invalidate and refetch
    //         queryClient.invalidateQueries({ queryKey: ["pending-reviews-pharmacies"] })
    //     },
    // })

    // if (acceptMutation.isLoading || rejectMutation.isLoading) {
    //     return <div className="flex flex-row justify-between">

    //         Loading
    //     </div>
    // }



    return (
        <div className="flex flex-row hover:bg-appPrimary">

            <div className="flex flex-row w-full lg:w-1/2 align-center">
                <div className="flex flex-col w-full" >
                    <p>{data.name}</p>

                    {data.zone &&
                        <Badge variant={"secondary"} className="lg:hidden text-appOrange bg-orange-50  w-fit">{data.zone}</Badge>

                    }



                </div>

                <div id="rowCoordinates" className='hidden md:flex w-96 text-appGray font-medium items-center gap-2 text-xs lg:hidden'>
                    <CiLocationOn size={15} />
                    <div>
                        {data.coordinates.latitude}, {data.coordinates.longitude}
                    </div>

                </div>


                <div className='w-32 lg:hidden self-center'>
                    {
                        data.open && <Badge className='text-green-500 h-fit self-center bg-green-100'>Open</Badge>
                    }
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

        </div>)
}

export default PharmaciesTableRow 