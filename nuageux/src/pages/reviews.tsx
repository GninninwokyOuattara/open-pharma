
import { refreshToken } from "@/api/auth";
import DataTable from "@/components/datatable";
import { columns } from "@/components/datatables/reviewDatatableColumns";
import withNavigationBarLayout from "@/components/layout/withNavigationBarLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/auth";
import { IPanigation, PharmacyBaseData } from "@/types/datatypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { useCallback, useState } from "react";


const Reviews = () => {
    const { access } = useAuth()
    const queryClient = useQueryClient();



    const [page, setPage] = useState(1)
    const getPendingReviewsPharmacies = useCallback((page = 1) => axios.get(`http://localhost:8080/admin-api/pharmacies-pending-review?page=${page}`, {
        headers: {
            Authorization: `Bearer ${access}`
        }
    }), [access])


    const { isLoading, isError, data, isSuccess } = useQuery<AxiosResponse<IPanigation<PharmacyBaseData>, any>>({
        queryKey: ['pending-reviews-pharmacies', page],
        queryFn: () => getPendingReviewsPharmacies(page),
        keepPreviousData: true
    })

    let pharmaciesPendingReview: PharmacyBaseData[] = []

    if (isSuccess) pharmaciesPendingReview = data?.data.results

    const mutation = useMutation({
        mutationFn: refreshToken,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ["pending-reviews-pharmacies"] })
        },
    })


    return (
        <div className="px-4 pt-4">

            <Input placeholder="Search pharmacies" />
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