import { PharmacyData } from "@/types/dataTypes"
import { ColumnDef } from "@tanstack/react-table"
import PharmaciesTableRow from "../pharmaciesTableRow"
import PharmaciesStatusTData from "./pharmaciesStatusTData"



export const columns: ColumnDef<PharmacyData>[] = [
    {
        accessorKey: "name",
        cell: ({ row }) => {
            return (
                <PharmaciesTableRow data={row.original} />
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
    },
    // {
    //     accessorKey: "open",
    //     header: "Status"
    // },
    {
        accessorKey: "active",
        header: "Status",
        cell: ({ row }) => <PharmaciesStatusTData {...{ row }} />
    }
]