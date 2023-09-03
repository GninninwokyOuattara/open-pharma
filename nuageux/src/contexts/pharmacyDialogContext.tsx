import { getPharmacyDetails } from "@/api/pharmaciesApis";
import { useToast } from "@/components/ui/use-toast";
import { PharmacyDataDetailed } from "@/types/dataTypes";
import { useMutation } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react";



interface IPharmacyDialogContext {
    open: boolean;
    setOpen: (open: boolean) => void;
    pharmacySelectedId: string,
    setPharmacySelectedId: (id: string) => void,
    openModalForPharmacyWithId: (id: string) => void,
    pharmacyDetails?: PharmacyDataDetailed,
    isLoading: boolean
}

const PharmacyDialogContext = createContext<IPharmacyDialogContext>({
    open: false,
    setOpen: () => { },
    pharmacySelectedId: "",
    setPharmacySelectedId: () => { },
    openModalForPharmacyWithId: () => { },
    pharmacyDetails: undefined,
    isLoading: false
})


const PharmacyDialogProvider: React.FC<any> = ({ children }) => {

    const [open, setOpen] = useState(false)
    const [pharmacyDetails, setPharmacyDetails] = useState<PharmacyDataDetailed>()
    const [pharmacySelectedId, setPharmacySelectedId] = useState("")

    const { toast } = useToast()



    // Mutation handler
    const { isLoading, mutate } = useMutation({
        mutationFn: (pharmacyId: string) => getPharmacyDetails(pharmacyId),
        onSuccess: (data) => {
            setPharmacyDetails(data.data)
            setOpen(true)
        },
        onError: () => {
            toast({
                title: "Une erreur est survenue. Veuillez réessayer plus tard.",
            })
        }

    })

    const openModalForPharmacyWithId = (id: string) => {
        mutate(id)
    }

    return (
        <PharmacyDialogContext.Provider value={{
            open,
            setOpen,
            pharmacySelectedId,
            setPharmacySelectedId,
            openModalForPharmacyWithId,
            pharmacyDetails,
            isLoading

        }} >
            {children}
        </PharmacyDialogContext.Provider>
    )
}

const usePharmacyDialog = () => useContext(PharmacyDialogContext)

export { PharmacyDialogProvider, usePharmacyDialog };
