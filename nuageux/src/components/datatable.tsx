
import { Badge } from "@/components/ui/badge"
import { PharmacyBaseData } from "@/types/datatypes"


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
import moment from "moment"
import { IconType } from "react-icons"
import { AiOutlineCheck } from "react-icons/ai"
import { RxCross1 } from "react-icons/rx"


interface IIconButtonProps {
    icon: IconType,
    onClick?: () => void
    hoverColor: string
    size?: number
}
const IconButton: React.FC<IIconButtonProps> = ({
    icon: IconComponent,
    onClick,
    hoverColor,
    size
}) => {



    return (<IconComponent
        className={`color-appOrange fill-appOrange hover:${hoverColor} cursor-pointer`}
        size={size || 15}

    />)
}


const ReviewTableRow: React.FC<{ data: PharmacyBaseData }> = ({ data }) => (
    <div className="flex flex-row justify-between">

        <div className="flex flex-col" >
            <p>{data.name}</p>

            {data.zone &&
                <Badge variant={"secondary"} className="text-appOrange w-fit">{data.zone}</Badge>

            }

            <p className="text-appGray font-light">--{moment(data.date_created).startOf("day").fromNow()}</p>

        </div>
        <div className="flex flex-col justify-center gap-4">
            <IconButton icon={AiOutlineCheck}
                hoverColor="text-red-500" />
            <IconButton icon={RxCross1}
                hoverColor="text-red-500" />
        </div>
    </div>
)



export const columns: ColumnDef<PharmacyBaseData>[] = [
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            return (
                <ReviewTableRow data={row.original} />
            )
        }
    },
    {
        accessorKey: "zone",
        header: "Zone",
    },
    {
        accessorKey: "date_created",
        header: "Date Created",
    }
]

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}


export const DataTable = <TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) => {
    const table = useReactTable({
        data,
        columns,
        manualPagination: true,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            columnVisibility: {
                zone: false,
                date_created: false
            },


        },

    })

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
                                    className="hover:bg-appPrimary"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="font-bold">
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

