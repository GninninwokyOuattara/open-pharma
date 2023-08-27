
import { getPendingReviewsPharmacies } from "@/api/reviewsApis";
import DataTable from "@/components/datatables/datatable";
import { columns } from "@/components/datatables/reviewDatatableColumns";
import TablePagination from "@/components/datatables/tablePagination";
import withNavigationBarLayout from "@/components/layout/withNavigationBarLayout";
import { Input } from "@/components/ui/input";
import { PharmacyBaseData } from "@/types/datatypes";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";


const Reviews = () => {
    const queryClient = useQueryClient();
    const [nameFilter, setNameFilter] = useState("")
    const [page, setPage] = useState(1)


    const { isLoading, isError, data, isSuccess } = useQuery({
        queryKey: ['pending-reviews-pharmacies', nameFilter, page],
        queryFn: () => getPendingReviewsPharmacies(nameFilter, page),
        keepPreviousData: true
    })

    console.log("islodin", isLoading)

    let pharmaciesPendingReview: PharmacyBaseData[] = []

    if (isSuccess) pharmaciesPendingReview = data?.data.results



    let timeoutID: any
    const setFilterWithDelay = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (timeoutID != null) clearTimeout(timeoutID)
        timeoutID = setTimeout(() => {

            if (e.target.value === "") setNameFilter("")
            else {
                setNameFilter(e.target.value)
                setPage(1)
            }
        }, 500)
    }


    return (
        <div className="px-4 pt-4">

            <Input placeholder="Search pharmacies"
                // value={nameFilter}
                onChange={setFilterWithDelay}
            />
            <div className="mt-4">


                <DataTable columns={columns} data={pharmaciesPendingReview} />


                <div className="my-4 flex justify-center align-center ">

                    <TablePagination
                        count={data?.data.count || 0}
                        page={page}
                        pageLength={25}
                        setPageFn={setPage}
                        next={data?.data.next || null}
                        previous={data?.data.previous || null}
                    />
                </div>
            </div>
        </div>
    )
}





export default withNavigationBarLayout(Reviews)