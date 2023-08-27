import { getPharmacies } from "@/api/pharmaciesApis";
import DataTable from "@/components/datatables/datatable";
import { columns } from "@/components/datatables/pharmaciesDatatableColumns";
import TablePagination from "@/components/datatables/tablePagination";

import withNavigationBarLayout from "@/components/layout/withNavigationBarLayout";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

function pharmacies() {
    const [nameFilter, setNameFilter] = useState("")
    const [page, setPage] = useState(1)
    const [zoneFilter, setZoneFilter] = useState("")

    const { isLoading, isError, data, isSuccess } = useQuery({
        queryKey: ['pending-reviews-pharmacies', nameFilter, page],
        queryFn: () => getPharmacies({
            page: page,
            nameFilter: nameFilter,
            zoneFilter: zoneFilter
        }),
        keepPreviousData: true
    })


    return (
        <div className="px-4 pt-4">

            <Input placeholder="Search pharmacies"
            // value={nameFilter}
            // onChange={setFilterWithDelay}
            />
            <div className="mt-4">


                <DataTable columns={columns} data={data?.data.results || []} />


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

export default withNavigationBarLayout(pharmacies)