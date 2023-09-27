import { batchReviewPharmacies } from "@/api/reviewsApis"
import { toast } from "@/components/ui/use-toast"
import { useReviewTable } from "@/contexts/reviewTableContext"
import { BatchReviewQueryData } from "@/types/apiTypes"
import { PharmacyData } from "@/types/dataTypes"
import { DialogClose } from "@radix-ui/react-dialog"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { MdOutlinePendingActions } from "react-icons/md"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"


const ReviewSelectedButton = () => {

    const { tableRef, globalCheckButtonMode, selectedPharmaciesLength } = useReviewTable()

    console.log("Check selected", globalCheckButtonMode)

    const queryClient = useQueryClient();

    const batchAcceptMutation = useMutation({
        mutationFn: (data: BatchReviewQueryData) => batchReviewPharmacies(data),
        onSuccess: (response) => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ["pending-reviews-pharmacies"] })
            tableRef?.current?.toggleAllPageRowsSelected(false)
            toast({ title: response.data.message })

        },
        onError: () => {
            toast({ title: "An unexpected error occured, please try again later." })

        }
    })


    const handle = () => {
        if (tableRef?.current) {
            console.log(tableRef.current.getFilteredSelectedRowModel().rows)
        }
    }

    const checkAll = () => {
        if (tableRef?.current) {
            if (globalCheckButtonMode === "Check All") {
                tableRef.current.toggleAllPageRowsSelected(true)
                console.log(tableRef.current.getFilteredSelectedRowModel())


            } else {
                tableRef.current.toggleAllPageRowsSelected(false)
                console.log(globalCheckButtonMode, "SelectedPharmacies", tableRef.current.getFilteredSelectedRowModel())

            }
        }
    }

    const reviewSelectedPharmacies = (action: "accept" | "reject",) => {
        const pharmaciesIds: string[] = []
        const rows = tableRef?.current?.getFilteredSelectedRowModel().rows
        if (rows) {
            rows.forEach((row) => {
                pharmaciesIds.push(row.original.id)
            })
        }

        console.log("Selected Pharmacies", pharmaciesIds)

        batchAcceptMutation.mutate(
            {
                review_action: action,
                pharmacies: pharmaciesIds
            }
        )
    }







    return (
        <div className="flex gap-2 h-full">

            <Button
                className="w-32"
                onClick={checkAll}
            >
                {globalCheckButtonMode}
            </Button>

            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        id="reviewAll"
                        className={`bg-orange-500 hover:bg-orange-600 ${selectedPharmaciesLength > 0 ? "block" : "hidden"}`}
                        onClick={handle}
                    >
                        <MdOutlinePendingActions size={26}
                            className={"text-appWhite"}
                        />
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[90%]  py-5 w-[95%]">
                    <DialogHeader>
                        <div className="flex flex-row h-8  gap-5 items-center">

                            <DialogTitle className="text-appOrange">{tableRef?.current?.getFilteredSelectedRowModel().rows.length} Pharmacies selected </DialogTitle>

                            <div className="hidden md:flex flex-row gap-2 h-full">
                                <DialogClose>
                                    <Button
                                        type="submit"
                                        onClick={
                                            () => reviewSelectedPharmacies("accept")
                                        }
                                        className="hover:bg-appOrange h-full"
                                    >

                                        Accept

                                    </Button>

                                </DialogClose>

                                <DialogClose>

                                    <Button
                                        type="submit"
                                        onClick={() => () => reviewSelectedPharmacies("reject")}
                                        className="hover:bg-appOrange h-full"

                                    >
                                        Reject
                                    </Button>
                                </DialogClose>
                            </div>
                        </div>


                    </DialogHeader>

                    <div className="md:hidden flex flex-col gap-1 justify-center">
                        <DialogClose asChild>

                            <Button
                                type="submit"
                                onClick={() => reviewSelectedPharmacies("accept")}
                                className="hover:bg-appOrange"
                            >

                                Accept

                            </Button>
                        </DialogClose>
                        <DialogClose asChild>

                            <Button
                                type="submit"
                                onClick={() => reviewSelectedPharmacies("reject")}
                                className="hover:bg-appOrange"

                            >
                                Reject
                            </Button>
                        </DialogClose>
                    </div>

                    <p className="text-xl">Below is the list of pharmacies</p>
                    <div className="h-72 md:h-96 overflow-scroll">

                        {
                            tableRef?.current?.getFilteredSelectedRowModel().rows.map((row, index) => {
                                const pharmacy = row.original as PharmacyData
                                return (
                                    <>
                                        <DialogDescription>{index + 1}. {pharmacy.name}</DialogDescription>

                                    </>
                                )
                            })
                        }

                    </div>

                </DialogContent>
            </Dialog>



        </div>



    )
}





export default ReviewSelectedButton