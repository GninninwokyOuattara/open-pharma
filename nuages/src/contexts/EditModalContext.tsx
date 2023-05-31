import { useDisclosure } from '@chakra-ui/react';
import { createContext, useCallback, useMemo, useState } from 'react';
import { PharmacyFullState } from '../types';


const backendUrl = process.env.REACT_APP_DJANGO_API_URL


export interface EditModalContextInterface {

    isOpen: boolean;
    openEditPharmacyModal: (pharmacy: PharmacyFullState) => void;
    closeEditPharmacyModal: () => void;
    pharmacyInEditMode: PharmacyFullState | null;
    setPharmacyInEditMode: React.Dispatch<React.SetStateAction<PharmacyFullState | null>>;
}


export const EditModalContext = createContext<EditModalContextInterface | null>(null);

export const EditModalContextProvider = ({ children }: any) => {


    const [pharmacyInEditMode, setPharmacyInEditMode] = useState<PharmacyFullState | null>(null)
    const { isOpen, onOpen, onClose } = useDisclosure()




    const openEditPharmacyModal = useCallback((pharmacy: PharmacyFullState) => {
        console.log("Selected pharmacy for modal open: ", pharmacy)
        setPharmacyInEditMode(pharmacy)
        onOpen()
    }, [setPharmacyInEditMode])

    const closeEditPharmacyModal = useCallback(() => {
        setPharmacyInEditMode(null)
        onClose()
    }, [setPharmacyInEditMode])


    const value = useMemo(() => ({
        isOpen,
        openEditPharmacyModal,
        closeEditPharmacyModal,
        pharmacyInEditMode,
        setPharmacyInEditMode
    }), [isOpen, openEditPharmacyModal, closeEditPharmacyModal, pharmacyInEditMode, setPharmacyInEditMode])


    return (


        <EditModalContext.Provider value={value}>
            {children}
        </EditModalContext.Provider>

    )

}


export default EditModalContext