import { acceptPharmacyPendingReview, rejectPharmacyPendingReview } from "@/api/reviewsApis";
import { PharmacyBaseData } from "@/types/dataTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { MdOutlinePendingActions } from "react-icons/md";
import ReviewActionButton from "./buttons/reviewActionButton";
import { Badge } from "./ui/badge";



const ReviewTableRow: React.FC<{ data: PharmacyBaseData }> = ({ data }) => {

    const queryClient = useQueryClient();

    const acceptMutation = useMutation({
        mutationFn: () => acceptPharmacyPendingReview(data.id),
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ["pending-reviews-pharmacies"] })
        },
        onError: () => {
        }
    })

    const rejectMutation = useMutation({
        mutationFn: () => rejectPharmacyPendingReview(data.id),
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ["pending-reviews-pharmacies"] })
        },
    })

    if (acceptMutation.isLoading || rejectMutation.isLoading) {
        return <div className="flex flex-row justify-between">

            Loading
        </div>
    }



    return (
        <div className="flex flex-row justify-between h-16 md:h-auto h-fit p-2">

            <div className="flex flex-row w-full ">
                <div className="flex flex-col lg:w-2/4 w-full md:w-2/3" >
                    <p>{data.name}</p>

                    {data.zone &&
                        <>
                            <Badge id="badgeSm" variant={"secondary"} className="md:hidden text-appOrange bg-orange-50 w-fit">{data.zone.length > 19 ? data.zone.substring(0, 19) + "..." : data.zone}</Badge>

                            <Badge id="badgeMd" variant={"secondary"} className="hidden md:flex lg:hidden text-appOrange bg-orange-50 w-fit">{data.zone}</Badge>
                        </>

                    }

                    <p className="text-appGray font-light md:hidden">Added {moment(data.date_created).startOf("day").fromNow()}</p>

                </div>
                <div className="hidden lg:flex lg:w-2/4 items-center">
                    {data.zone &&
                        <p className="text-appOrange w-fit ">{data.zone}</p>

                    }
                </div>
                <div className="w-1/3  items-center justify-center hidden md:flex lg:flex lg:w-1/4 items-center">

                    <p className="text-appGray font-light">Added {moment(data.date_created).startOf("day").fromNow()}</p>


                </div>

            </div>
            <div className="flex flex-col justify-center">
                <ReviewActionButton
                    icon={MdOutlinePendingActions}
                    pharmacyName={data.name}
                    acceptFunction={() => acceptMutation.mutate()}
                    rejectFunction={() => rejectMutation.mutate()}
                />
            </div>
        </div>)
}

export default ReviewTableRow