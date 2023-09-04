import { getPharmacyDetails, updatePharmacyDetails } from "@/api/pharmaciesApis";
import { useToast } from "@/components/ui/use-toast";
import { PharmacyDataDetailed, PharmacyDataDetailedForMofication } from "@/types/dataTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react";



interface IPharmacyDialogContext {
    open: boolean;
    setOpen: (open: boolean) => void;
    pharmacySelectedId: string,
    setPharmacySelectedId: (id: string) => void,
    openModalForPharmacyWithId: (id: string) => void,
    pharmacyDetails?: PharmacyDataDetailed,
    isLoading: boolean,
    submitModification: (pharmacyData: PharmacyDataDetailedForMofication) => void

}

const PharmacyDialogContext = createContext<IPharmacyDialogContext>({
    open: false,
    setOpen: () => { },
    pharmacySelectedId: "",
    setPharmacySelectedId: () => { },
    openModalForPharmacyWithId: () => { },
    pharmacyDetails: undefined,
    isLoading: false,
    submitModification: () => { }

})


const PharmacyDialogProvider: React.FC<any> = ({ children }) => {

    const [open, setOpen] = useState(false)
    const [pharmacyDetails, setPharmacyDetails] = useState<PharmacyDataDetailed>()
    const [pharmacySelectedId, setPharmacySelectedId] = useState("")

    const { toast } = useToast()
    const queryClient = useQueryClient();



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


    const submitMutation = useMutation({
        mutationFn: (pharmacyData: PharmacyDataDetailedForMofication) => updatePharmacyDetails(pharmacyData),
        onSuccess: (data) => {
            // setPharmacyDetails(data.data)
            // setOpen(true)
            queryClient.invalidateQueries({ queryKey: ["pharmacies"] })
            toast({
                title: `${data.data.name} has been modified successfully !`,
            })
            setOpen(false)

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

    const submitModification = (pharmacyData: PharmacyDataDetailedForMofication) => {
        submitMutation.mutate(pharmacyData)
    }

    return (
        <PharmacyDialogContext.Provider value={{
            open,
            setOpen,
            pharmacySelectedId,
            setPharmacySelectedId,
            openModalForPharmacyWithId,
            pharmacyDetails,
            isLoading,
            submitModification

        }} >
            {children}
        </PharmacyDialogContext.Provider>
    )
}

const usePharmacyDialog = () => useContext(PharmacyDialogContext)

export { PharmacyDialogProvider, usePharmacyDialog };
