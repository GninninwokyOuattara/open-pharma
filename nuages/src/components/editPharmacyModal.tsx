import { Box, Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea } from "@chakra-ui/react";
import { useCallback, useContext, useEffect, useState } from "react";
import { PharmaciesContext, PharmaciesContextInterface } from "../contexts/pharmaciesContext";
import { ToastContext, ToastContextInterface } from "../contexts/toast";
import { PharmacyFullState } from "../types";

// import Lorem component

// interface for isOpen and isClose



interface EditPharmacyModalProps {
    isOpen: boolean;
    // onOpen : () => void;
    onClose: () => void;

}


const EditPharmacyModal: React.FC<EditPharmacyModalProps> = ({ isOpen, onClose }) => {

    // TODO : Add a loader for when data is not ready. Maybe ?

    const { pharmacyInEditMode, closeEditingPharmacyModal, updatePharmacyInPharmacies } = useContext(PharmaciesContext) as PharmaciesContextInterface

    // get successToast and errorToast from context

    const { successToast, errorToast } = useContext(ToastContext) as ToastContextInterface

    const backendUrl = process.env.REACT_APP_DJANGO_API_URL;

    const [pharmacyForm, setPharmacyForm] = useState<PharmacyFullState>(pharmacyInEditMode as PharmacyFullState)



    useEffect(() => {
        if (pharmacyInEditMode) {
            setPharmacyForm(pharmacyInEditMode)
        }

    }, [pharmacyInEditMode])

    const handleFormChange = (change: { [key: string]: string }) => {

        // get key and value from change

        const key = Object.keys(change)[0]
        let value = Object.values(change)[0]

        if (key === "latitude") {
            let latitude = parseFloat(value)
            const coordinates = { ...pharmacyForm.coordinates, latitude: latitude }
            setPharmacyForm((prevFormState) => {

                return { ...prevFormState, coordinates: { ...coordinates } }

            })

        } else if (key === "longitude") {
            let longitude = parseFloat(value)
            const coordinates = { ...pharmacyForm.coordinates, longitude: longitude }
            setPharmacyForm((prevFormState) => {
                return { ...prevFormState, coordinates: { ...coordinates } }
            })
        } else {


            setPharmacyForm((prevFormState) => {
                return { ...prevFormState, [key]: value }
            })



        }
    }

    const updatePharmacy = useCallback(async () => {
        // Put request to update pharmacy

        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(pharmacyForm)
        }

        try {
            const response = await fetch(`${backendUrl}/admin-api/pharmacies/${pharmacyForm.id}/`, options)
            const data = await response.json()
            updatePharmacyInPharmacies(data)
            successToast("Sucess", "Pharmacy updated successfully")
            closeEditingPharmacyModal()
        }
        catch (error) {

            errorToast("Error", "Something went wrong")
        }



    }, [pharmacyForm, backendUrl, successToast, errorToast])






    return (
        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={() => closeEditingPharmacyModal()}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {
                        pharmacyForm && (
                            <>
                                <FormControl>
                                    <FormLabel>Name</FormLabel>
                                    <Input placeholder={`${pharmacyInEditMode?.name}`} value={pharmacyForm.name}
                                        onChange={(e) => handleFormChange(
                                            { name: e.target.value }
                                        )} />
                                </FormControl>

                                <FormControl>
                                    <FormLabel>Description</FormLabel>
                                    <Textarea placeholder={`${pharmacyInEditMode?.description}`} value={pharmacyForm.description}
                                        onChange={(e) => handleFormChange(
                                            { description: e.target.value }
                                        )} />
                                </FormControl>

                                <FormControl>
                                    <FormLabel>Coordinates</FormLabel>
                                    <Box display={"flex"} gap={1}>
                                        <Input
                                            placeholder={`${pharmacyInEditMode?.coordinates.latitude}`}
                                            value={pharmacyForm.coordinates!.latitude}
                                            onChange={(e) => handleFormChange(
                                                { latitude: e.target.value }
                                            )} />
                                        <Input placeholder={`${pharmacyInEditMode?.coordinates.longitude}`} value={pharmacyForm.coordinates!.longitude}
                                            onChange={(e) => handleFormChange(
                                                { longitude: e.target.value }
                                            )} />

                                    </Box>
                                </FormControl>


                            </>
                        )
                    }


                </ModalBody>

                <ModalFooter >
                    <Button
                        colorScheme='orange'
                        mr={3}
                        // onClick={onClose}
                        onClick={() => updatePharmacy()}
                    >
                        Confirm
                    </Button>
                    {/* <Button variant='ghost'>Secondary Action</Button> */}
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default EditPharmacyModal;