import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { PharmaciesContext, PharmaciesContextInterface } from "../contexts/pharmaciesContext";

// import Lorem component

// interface for isOpen and isClose

interface EditPharmacyModalProps {
    isOpen: boolean;
    // onOpen : () => void;
    onClose: () => void;

}


const EditPharmacyModal: React.FC<EditPharmacyModalProps> = ({ isOpen, onClose }) => {

    // const { isOpen, onOpen, onClose } = useDisclosure()

    // get pharmacyInEditMode from context

    const { pharmacyInEditMode, closeEditingPharmacyModal } = useContext(PharmaciesContext) as PharmaciesContextInterface

    console.log(pharmacyInEditMode)





    return (
        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={() => closeEditingPharmacyModal()}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text fontWeight='bold' mb='1rem'>
                        You can scroll the content behind the modal
                    </Text>
                    {/* <Lorem count={2} /> */}
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button variant='ghost'>Secondary Action</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default EditPharmacyModal;