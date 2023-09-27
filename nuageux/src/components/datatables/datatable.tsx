


import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableRow
} from "@/components/ui/table"
import { useReviewTable } from "@/contexts/reviewTableContext"
import { useEffect, useState } from "react"







interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}


export const DataTable = <TData, TValue>({
    columns,
    data
}: DataTableProps<TData, TValue>) => {

    const [rowSelection, setRowSelection] = useState({})
    const { tableRef, setGlobalCheckButtonMode, setSelectedPharmaciesLength } = useReviewTable()


    const table = useReactTable({
        data,
        columns,
        manualPagination: true,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            rowSelection,
            columnVisibility: {
                zone: false,
                date_created: false
            },

        },

    })

    if (table && tableRef) tableRef.current = table
    useEffect(() => {
        console.log("1", tableRef?.current?.getFilteredSelectedRowModel().rows.length)
        console.log("2", tableRef?.current?.getRowModel().rows.length)

        const selectPharmaciesLength = tableRef?.current?.getFilteredSelectedRowModel().rows.length || 0
        setSelectedPharmaciesLength(selectPharmaciesLength)

        if (tableRef?.current?.getFilteredSelectedRowModel().rows.length === tableRef?.current?.getRowModel().rows.length) {
            setGlobalCheckButtonMode("Uncheck All")
        } else {
            setGlobalCheckButtonMode("Check All")
        }
    }, [rowSelection, tableRef])

    return (
        <div>
            <div className="rounded-md border">
                <Table>
                    {/* <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id} >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader> */}
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="hover:bg-appPrimary w-full"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="font-bold  p-0">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

            </div>

        </div>
    )
}



export default DataTable

