




import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement, VStack } from "@chakra-ui/react";
import { palette } from "../colorPalette";






const PendingReviewsPage = () => {


    return (
        <>

            <VStack
                height={"full"}
                width={"full"}
            >
                <InputGroup
                    size='lg'

                >
                    <InputLeftElement pointerEvents='none'>
                        <SearchIcon color={palette.app.gray} />
                    </InputLeftElement>
                    <Input
                        placeholder='Search pharmacies'
                        style={{
                            backgroundColor: palette.app.white,
                        }} />
                </InputGroup>
            </VStack>
        </>
    )
}
























export default PendingReviewsPage;

















