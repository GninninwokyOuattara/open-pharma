
import { getPendingReviewsPharmacies } from "@/api/reviewsApis";
import ReviewSelectedButton from "@/components/buttons/reviewSelectedButton";
import DataTable from "@/components/datatables/datatable";
import { columns } from "@/components/datatables/reviewDatatableColumns";
import TablePagination from "@/components/datatables/tablePagination";
import withNavigationBarLayout from "@/components/layout/withNavigationBarLayout";
import { Input } from "@/components/ui/input";
import { PharmacyBaseData } from "@/types/dataTypes";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";


const Reviews = () => {
    const [searchParams, _] = useSearchParams();


    const [nameFilter, setNameFilter] = useState("")
    const [openFilter, __] = useState(
        () => {
            const open = searchParams.get("open")
            if (open) return open
            return undefined
        }
    )
    const [page, setPage] = useState(1)


    const { data, isSuccess } = useQuery({
        queryKey: ['pending-reviews-pharmacies', nameFilter, openFilter, page],
        queryFn: () => getPendingReviewsPharmacies(nameFilter, openFilter, page),
        keepPreviousData: true
    })

    let pharmaciesPendingReview: PharmacyBaseData[] = []

    if (isSuccess) pharmaciesPendingReview = data?.data.results

    // TODO : Handle loading state



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


            <div className="w-full  flex items-center gap-2">

                <Input placeholder="Search pharmacies"
                    // value={nameFilter}
                    onChange={setFilterWithDelay}
                />
                <ReviewSelectedButton />
            </div>
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