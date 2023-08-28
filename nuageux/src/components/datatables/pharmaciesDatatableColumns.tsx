import { activatePharmacy, deactivatePharmacy } from "@/api/pharmaciesApis"
import { Switch } from "@/components/ui/switch"
import { PharmacyData } from "@/types/dataTypes"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ColumnDef } from "@tanstack/react-table"
import { useState } from "react"
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

            const [toggleForm, setToggleForm] = useState<"activation" | "deactivation">(() => {
                return row.original.active ? "deactivation" : "activation"
            })
            const queryClient = useQueryClient();

            const activationMutation = useMutation({
                mutationFn: () => activatePharmacy(row.original.id),
                onSuccess: () => {
                    // Invalidate and refetch
                    setToggleForm("deactivation")
                    queryClient.invalidateQueries({ queryKey: ["pharmacies"] })
                },
                onError: () => {
                    console.log("Well Well Well it seems like something went wrong")
                }
            })

            const deactivationMutation = useMutation({
                mutationFn: () => deactivatePharmacy(row.original.id),
                onSuccess: () => {
                    // Invalidate and refetch
                    setToggleForm("activation")
                    queryClient.invalidateQueries({ queryKey: ["pharmacies"] })
                },
                onError: () => {
                    console.log("Well Well Well it seems like something went wrong")
                }
            })

            const switcher = () => {
                if (toggleForm === "activation") {
                    activationMutation.mutate()
                } else {
                    deactivationMutation.mutate()
                }
            }

            return (
                <Switch
                    className="bg-red-500 text-red-500"
                    checked={row.original.active}
                    onCheckedChange={switcher}
                    aria-readonly
                />

            )
        }
    }
]