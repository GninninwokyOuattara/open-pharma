import { Switch } from "@/components/ui/switch"
import { PharmacyData } from "@/types/dataTypes"
import { ColumnDef } from "@tanstack/react-table"
import PharmaciesTableRow from "../pharmaciesTableRow"



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
        cell: ({ row }) => {
            return <Switch
                checked={row.original.active}
                onCheckedChange={() => { }}
                aria-readonly
            />
        }
    }
]