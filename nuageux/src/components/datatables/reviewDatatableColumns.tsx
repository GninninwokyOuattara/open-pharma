import { PharmacyBaseData } from "@/types/datatypes"
import { ColumnDef } from "@tanstack/react-table"
import ReviewTableRow from "../reviewTableRow"



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