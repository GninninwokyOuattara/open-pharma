import { activatePharmacy, deactivatePharmacy } from "@/api/pharmaciesApis"
import { PharmacyData } from "@/types/dataTypes"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Row } from "@tanstack/react-table"
import { useState } from "react"
import { Switch } from "../ui/switch"
import { useToast } from "../ui/use-toast"


interface PharmaciesStatusTDataProps {
    row: Row<PharmacyData>
}

const PharmaciesStatusTData: React.FC<PharmaciesStatusTDataProps> = ({ row }) => {

    const { toast } = useToast()

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
            toast({
                title: `${row.original.name} has been activated`,
            })
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
            toast({
                title: `${row.original.name} has been deactivated`,
            })
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
        <>
            <Switch
                className="bg-red-500 text-red-500"
                checked={row.original.active}
                onCheckedChange={switcher}
                aria-readonly
            />
        </>

    )
}


export default PharmaciesStatusTData