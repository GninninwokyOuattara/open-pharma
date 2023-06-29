import { useDisclosure } from '@chakra-ui/react';
import { createContext, useCallback, useMemo, useState } from 'react';
import { PendingReviewPharmacy } from '../types';


const backendUrl = process.env.REACT_APP_DJANGO_API_URL


export interface EditPendingModalContextInterface {

    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    openPendingEditPharmacyModal: (pharmacy: PendingReviewPharmacy) => void;
    closePendingEditPharmacyModal: () => void;
    pharmacyInEditMode: PendingReviewPharmacy | null;
    setPharmacyInEditMode: React.Dispatch<React.SetStateAction<PendingReviewPharmacy | null>>;
    pharmacyInEditModeSave: PendingReviewPharmacy | null;
    setPharmacyInEditModeSave: React.Dispatch<React.SetStateAction<PendingReviewPharmacy | null>>;


}


export const EditPendingModalContext = createContext<EditPendingModalContextInterface | null>(null);

export const EditPendingModalContextProvider = ({ children }: any) => {


    const [pharmacyInEditMode, setPharmacyInEditMode] = useState<PendingReviewPharmacy | null>(null)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [pharmacyInEditModeSave, setPharmacyInEditModeSave] = useState<PendingReviewPharmacy | null>(null)




    const openPendingEditPharmacyModal = useCallback((pharmacy: PendingReviewPharmacy) => {
        console.log("Selected pharmacy for modal open: ", pharmacy)
        setPharmacyInEditMode(pharmacy)
        setPharmacyInEditModeSave(pharmacy)
        onOpen()
    }, [setPharmacyInEditMode])

    const closePendingEditPharmacyModal = useCallback(() => {
        setPharmacyInEditMode(null)
        setPharmacyInEditModeSave(null)
        onClose()
    }, [setPharmacyInEditMode])


    const value = useMemo(() => ({
        isOpen,
        onOpen,
        onClose,
        openPendingEditPharmacyModal,
        closePendingEditPharmacyModal,
        pharmacyInEditMode,
        setPharmacyInEditMode,
        pharmacyInEditModeSave
    }), [isOpen,
        onOpen,
        onClose,
        openPendingEditPharmacyModal,
        closePendingEditPharmacyModal, pharmacyInEditMode,
        pharmacyInEditModeSave,
        setPharmacyInEditMode])


    return (


        <EditPendingModalContext.Provider value={value}>
            {children}
        </EditPendingModalContext.Provider>

    )

}


export default EditPendingModalContext