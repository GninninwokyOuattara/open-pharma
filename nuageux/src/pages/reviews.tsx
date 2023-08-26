
import { getPendingReviewsPharmacies } from "@/api/reviewsApis";
import DataTable from "@/components/datatable";
import { columns } from "@/components/datatables/reviewDatatableColumns";
import withNavigationBarLayout from "@/components/layout/withNavigationBarLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/auth";
import { PharmacyBaseData } from "@/types/datatypes";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";


const Reviews = () => {
    const { access } = useAuth()
    const queryClient = useQueryClient();
    const [nameFilter, setNameFilter] = useState("")
    const [page, setPage] = useState(1)


    const { isLoading, isError, data, isSuccess } = useQuery({
        queryKey: ['pending-reviews-pharmacies', nameFilter, page],
        queryFn: () => getPendingReviewsPharmacies(nameFilter, page),
        keepPreviousData: true
    })

    let pharmaciesPendingReview: PharmacyBaseData[] = []

    if (isSuccess) pharmaciesPendingReview = data?.data.results



    let timeoutID: any
    const setFilterWithDelay = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (timeoutID != null) clearTimeout(timeoutID)
        timeoutID = setTimeout(() => {

            if (e.target.value === "") setNameFilter("")
            else {
                console.log("SET")
                setNameFilter(e.target.value)
            }
        }, 1000)
    }


    return (
        <div className="px-4 pt-4">

            <Input placeholder="Search pharmacies"
                // value={nameFilter}
                onChange={setFilterWithDelay}
            />
            <div className="mt-4">


                <DataTable columns={columns} data={pharmaciesPendingReview} />



                <div className="flex items-center justify-end space-x-2 py-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(page - 1)}
                        // disabled={!table.getCanPreviousPage()}
                        disabled={data?.data.previous === null}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(page + 1)}

                        // disabled={!table.getCanNextPage()}
                        disabled={data?.data.next === null}

                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}





export default withNavigationBarLayout(Reviews)