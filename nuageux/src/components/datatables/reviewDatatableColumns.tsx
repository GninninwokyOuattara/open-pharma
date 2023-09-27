import { Checkbox } from "@/components/ui/checkbox"
import { PharmacyBaseData } from "@/types/dataTypes"
import { ColumnDef } from "@tanstack/react-table"
import ReviewTableRow from "../reviewTableRow"




export const columns: ColumnDef<PharmacyBaseData>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                className="m-1 ml-3"
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
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