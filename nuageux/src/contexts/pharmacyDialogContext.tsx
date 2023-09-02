import { createContext, useContext, useState } from "react";



interface IPharmacyDialogContext {
    open: boolean;
    setOpen: (open: boolean) => void;
    pharmacySelectedId: string,
    setPharmacySelectedId: (id: string) => void
}

const PharmacyDialogContext = createContext<IPharmacyDialogContext>({
    open: false,
    setOpen: () => { },
    pharmacySelectedId: "",
    setPharmacySelectedId: () => { }
})


const PharmacyDialogProvider: React.FC<any> = ({ children }) => {
    const [open, setOpen] = useState(false)
    const [pharmacySelectedId, setPharmacySelectedId] = useState("")



    return (
        <PharmacyDialogContext.Provider value={{
            open,
            setOpen,
            pharmacySelectedId,
            setPharmacySelectedId

        }} >
            {children}
        </PharmacyDialogContext.Provider>
    )
}

const usePharmacyDialog = () => useContext(PharmacyDialogContext)

export { PharmacyDialogProvider, usePharmacyDialog };
