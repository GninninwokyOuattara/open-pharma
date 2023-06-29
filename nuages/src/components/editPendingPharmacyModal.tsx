import { Box, Button, FormControl, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalOverlay, Textarea } from "@chakra-ui/react";
import { useCallback, useContext } from "react";
import { palette } from "../colorPalette";
import EditPendingModalContext, { EditPendingModalContextInterface } from "../contexts/EditPendingModalContext";
import { ToastContext, ToastContextInterface } from "../contexts/toast";
import { isValidCoordinateValue } from "../utils/dry";
import SinglePharmacyLeafletMap from "./SinglePharmacyLeafletMap";

// import Lorem component

// interface for isOpen and isClose



interface EditPendingPharmacyModalProps {
    isOpen: boolean;
    // onOpen : () => void;
    onClose: () => void;

}


const EditPharmacyModal: React.FC<EditPendingPharmacyModalProps> = ({ isOpen, onClose }) => {


    // const { pharmacyInEditMode, closeEditingPharmacyModal, updatePendingReviewPharmacyInPharmacies } = useContext(PharmaciesReviewContext) as PharmaciesReviewContextInterface

    // get successToast and errorToast from context

    const { successToast, errorToast } = useContext(ToastContext) as ToastContextInterface

    const backendUrl = process.env.REACT_APP_DJANGO_API_URL;

    // const [pharmacyForm, setPharmacyForm] = useState<PharmacyFullStateEdit>(pharmacyInEditMode as PharmacyFullStateEdit)


    // const newLocal = useContext(PharmaciesContext) as PharmaciesContextInterface;
    // use edit modal context

    const { pharmacyInEditMode: pharmacyForm,
        setPharmacyInEditMode: setPharmacyForm,
        pharmacyInEditModeSave,
        isOpen: open,
        closePendingEditPharmacyModal } = useContext(EditPendingModalContext) as EditPendingModalContextInterface


    // console.log("Modal state", open)
    console.log("Pharmacy to be used", pharmacyForm)



    // useEffect(() => {
    //     if (pharmacyInEditMode) {
    //         setPharmacyForm(pharmacyInEditMode)
    //     }

    // }, [pharmacyInEditMode])

    const handleFormChange = (change: { [key: string]: string }) => {
        if (!pharmacyForm) {
            return
        }

        // get key and value from change

        const key: "latitude" | "longitude" | string = Object.keys(change)[0]
        let value: string = Object.values(change)[0]
        setPharmacyForm((prevFormState) => {

            if (prevFormState) {
                return { ...prevFormState, [key]: value }
            }
            return pharmacyForm

            // return { ...prevFormState, [key]: value }
        })
    }

    const isValidEdit = () => {
        if (!pharmacyForm) {
            return false
        }
        const { latitude, longitude } = pharmacyForm
        const { name } = pharmacyForm
        if (name === "") {
            errorToast("Error", "Name cannot be empty")
            return false
        }
        if (isValidCoordinateValue(latitude) && isValidCoordinateValue(longitude)) {
            return true
        } else {
            errorToast("", "Coordinates must be valid float numbers")
            return false
        }

    }

    const updatePharmacy = useCallback(async () => {
        // Put request to update pharmacy
        if (!isValidEdit()) {
            return

        }
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(pharmacyForm)
        }

        try {

            if (!pharmacyForm) {
                return
            }

            const response = await fetch(`${backendUrl}/admin-api/pharmacies/${pharmacyForm.id}/`, options)
            const data = await response.json()
            // updatePendingReviewPharmacyInPharmacies(data)
            successToast("Sucess", "Pharmacy updated successfully")
            // closeEditingPharmacyModal()
            closePendingEditPharmacyModal()
        }
        catch (error) {

            errorToast("Error", "Something went wrong")
        }



    }, [pharmacyForm, backendUrl, successToast, errorToast])






    return (
        <Modal blockScrollOnMount={false} isOpen={open}
            isCentered
            onClose={() => closePendingEditPharmacyModal()}


        >
            <ModalOverlay />
            <ModalContent
                backgroundColor={palette.custom.veryLightOrange}
                // width={"800px"}
                maxWidth={"80%"}
                height={"500px"}
                overflow={"hidden"}
            >
                <HStack spacing={1} flex={1}>

                    <Box display={"flex"}
                        height={"100%"} padding={5}
                        flexDirection={"column"}
                    >
                        <ModalBody
                            flex={1}
                            overflowY={"auto"}
                            flexDirection={"column"}
                        >
                            {
                                pharmacyForm && (
                                    <>
                                        <FormControl>
                                            <FormLabel>Name</FormLabel>
                                            <Input
                                                backgroundColor={"white"}
                                                placeholder={`${pharmacyInEditModeSave?.name}`}
                                                value={pharmacyForm.name}
                                                onChange={(e) => handleFormChange(
                                                    { name: e.target.value }
                                                )} />
                                        </FormControl>

                                        <FormControl>
                                            <FormLabel>Director</FormLabel>
                                            <Input
                                                backgroundColor={"white"}
                                                placeholder={`${pharmacyInEditModeSave?.director}`}
                                                value={pharmacyForm.director}
                                                onChange={(e) => handleFormChange(
                                                    { name: e.target.value }
                                                )} />
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Description</FormLabel>
                                            <Textarea
                                                backgroundColor={"white"}

                                                placeholder={`${pharmacyInEditModeSave?.description}`} value={pharmacyForm.description}
                                                onChange={(e) => handleFormChange(
                                                    { description: e.target.value }
                                                )} />
                                        </FormControl>

                                        <FormControl>
                                            <FormLabel>Coordinates</FormLabel>
                                            <Box display={"flex"} gap={1}>
                                                <Input
                                                    backgroundColor={"white"}

                                                    placeholder={pharmacyInEditModeSave?.latitude.toString()}
                                                    value={pharmacyForm.latitude}
                                                    onChange={(e) => handleFormChange(
                                                        { latitude: e.target.value }
                                                    )} />
                                                <Input
                                                    backgroundColor={"white"}

                                                    placeholder={pharmacyInEditModeSave?.longitude.toString()}
                                                    value={pharmacyForm.longitude}
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
                                onClick={() => console.log("Validate")}
                            >
                                Accept
                            </Button>
                            <Button
                                colorScheme='orange'
                                mr={3}
                                // onClick={onClose}
                                onClick={() => console.log("Validate")}
                            >
                                Reject
                            </Button>
                        </ModalFooter>
                    </Box>
                    <Box
                        width={"65%"}
                        height={"100%"}
                        backgroundColor={"white"}
                    >

                        <SinglePharmacyLeafletMap
                            latitude={pharmacyForm ? pharmacyForm.latitude : 0}
                            longitude={pharmacyForm ? pharmacyForm.longitude : 0}
                        />

                    </Box>

                </HStack>
                {/* <ModalHeader>Edit pharmacy</ModalHeader> */}
                <ModalCloseButton

                />
                {/* <ModalBody
                >
                    {
                        pharmacyForm && (
                            <>
                                <FormControl>
                                    <FormLabel>Name</FormLabel>
                                    <Input
                                        backgroundColor={"white"}
                                        placeholder={`${pharmacyInEditMode?.name}`}
                                        value={pharmacyForm.name}
                                        onChange={(e) => handleFormChange(
                                            { name: e.target.value }
                                        )} />
                                </FormControl>

                                <FormControl>
                                    <FormLabel>Description</FormLabel>
                                    <Textarea
                                        backgroundColor={"white"}

                                        placeholder={`${pharmacyInEditMode?.description}`} value={pharmacyForm.description}
                                        onChange={(e) => handleFormChange(
                                            { description: e.target.value }
                                        )} />
                                </FormControl>

                                <FormControl>
                                    <FormLabel>Coordinates</FormLabel>
                                    <Box display={"flex"} gap={1}>
                                        <Input
                                            backgroundColor={"white"}

                                            placeholder={`Latitude`}
                                            value={pharmacyForm.latitude}
                                            onChange={(e) => handleFormChange(
                                                { latitude: e.target.value }
                                            )} />
                                        <Input
                                            backgroundColor={"white"}

                                            placeholder={`Longitude`} value={pharmacyForm.longitude}
                                            onChange={(e) => handleFormChange(
                                                { longitude: e.target.value }
                                            )} />

                                    </Box>
                                </FormControl>


                            </>
                        )
                    }


                </ModalBody> */}



            </ModalContent>
        </Modal>
    )
}

export default EditPharmacyModal;