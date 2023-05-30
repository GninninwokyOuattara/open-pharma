import { useDisclosure } from '@chakra-ui/react';
import { createContext, useCallback, useState } from 'react';
import { PharmacyFullState } from '../types';


const backendUrl = process.env.REACT_APP_DJANGO_API_URL


export interface EditModalContextInterface {

    isOpen: boolean;
    openEditPharmacyModal: (pharmacy: PharmacyFullState) => void;
    closeEditPharmacyModal: () => void;
}


export const EditModalContext = createContext<EditModalContextInterface | null>(null);

export const EditModalContextProvider = ({ children }: any) => {


    const [pharmacyInEditMode, setPharmacyInEditMode] = useState<PharmacyFullState | null>(null)
    const { isOpen, onOpen, onClose } = useDisclosure()



    const openEditPharmacyModal = useCallback((pharmacy: PharmacyFullState) => {
        setPharmacyInEditMode(pharmacy)
        onOpen()
    }, [setPharmacyInEditMode])

    const closeEditPharmacyModal = useCallback(() => {
        setPharmacyInEditMode(null)
        onClose()
    }, [setPharmacyInEditMode])

}


export default EditModalContext