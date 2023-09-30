import { getPharmacies } from "@/api/pharmaciesApis";
import DataTable from "@/components/datatables/datatable";
import { columns } from "@/components/datatables/pharmaciesDatatableColumns";
import TablePagination from "@/components/datatables/tablePagination";

import withNavigationBarLayout from "@/components/layout/withNavigationBarLayout";
import { Input } from "@/components/ui/input";
import ZoneSelectInput from "@/components/zoneSelectInput";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";



import PharmacyModalRenderer from "@/components/PharmacyModalRenderer";
import PharmaciesPageFilterStateCtrl from "@/components/pharmaciesPageFilterStateCtrl";
import { useSearchParams } from "react-router-dom";


function Pharmacies() {

    const [searchParams, _] = useSearchParams();

    const [nameFilter, setNameFilter] = useState("")
    const [page, setPage] = useState(1)
    const [zoneFilter, setZoneFilter] = useState("")
    const [activeFilter, setActiveFilter] = useState(() => {
        const active = searchParams.get("active")
        if (active) return active
        return undefined
    })

    const [openFilter, setOpenFilter] = useState(() => {
        const open = searchParams.get("open")
        if (open) return open
        return undefined
    })



    const { data } = useQuery({
        queryKey: ['pharmacies', nameFilter, zoneFilter, activeFilter, openFilter, page],
        queryFn: () => getPharmacies({
            page: page,
            nameFilter: nameFilter,
            zoneFilter: zoneFilter,
            activeFilter: activeFilter,
            openFilter: openFilter
        }),
        keepPreviousData: true
    })

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

    const handleZoneFilterChange = (zone: string) => {
        setPage(1)
        setZoneFilter(zone)

    }


    return (

        // <ToastProvider>
        <>
            <div className="px-4 pt-4">
                <div className="flex flex-col gap-2">
                    <div className="mt-4 flex flex-col  gap-2 md:flex-row">

                        <Input placeholder="Search pharmacies"
                            className="w-full md:max-w-[25rem]"
                            // value={nameFilter}
                            onChange={setFilterWithDelay}
                        />
                        <ZoneSelectInput selectFn={handleZoneFilterChange} placeholder="Toutes les zones" />

                        <PharmaciesPageFilterStateCtrl
                            activeInitialState={activeFilter}
                            openInitialState={openFilter}
                            setOpenFilter={setOpenFilter}
                            setActiveFilter={setActiveFilter}
                        />
                    </div>




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
            <PharmacyModalRenderer />







        </>


    )
}

export default withNavigationBarLayout(Pharmacies)