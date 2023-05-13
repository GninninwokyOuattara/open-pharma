import { Box, Button, Checkbox, CheckboxGroup, Flex, Menu, MenuButton, MenuList, useCheckboxGroup } from "@chakra-ui/react"
import { useContext } from "react"


import { IoFilter } from "react-icons/io5"
import { palette } from "../colorPalette"
import { PharmaciesContext, PharmaciesContextInterface } from "../contexts/pharmaciesContext"

const TagsFilterMenu = () => {

    const { value, getCheckboxProps } = useCheckboxGroup({
        defaultValue: ['Inactive Pharmacies', 'Active Pharmacies', 'Open Pharmacies'],
    })

    const { setActiveTags, activeTags } = useContext(PharmaciesContext) as PharmaciesContextInterface


    return (
        <Menu>
            <Box>
                <MenuButton
                    as={Button}
                    rightIcon={<IoFilter />}
                    shadow={"xs"}
                    border={"1px solid"}
                    backgroundColor={"white"}
                    _hover={{
                        border: "1px solid",
                        borderColor: palette.orange.havePersonality,
                        color: palette.orange.havePersonality
                    }}
                >
                    Filter
                </MenuButton>

            </Box>
            <MenuList >

                <Flex direction={"column"} width={"full"} gap={2} paddingX={5}>
                    <CheckboxGroup defaultValue={["Inactive", "Active", "Open"]}
                        onChange={(activeTags: string[]) => setActiveTags(activeTags)}
                    >

                        <Checkbox
                            value={"Inactive"}
                            alignSelf={"flex-start"}
                            colorScheme='orange'
                            isChecked={activeTags.includes("Inactive")}
                        >
                            Inactive Pharmacies
                        </Checkbox>
                        <Checkbox
                            value={"Active"}
                            alignSelf={"flex-start"}
                            colorScheme='orange'
                            isChecked={activeTags.includes("Active")}
                        >
                            Active Pharmacies
                        </Checkbox>
                        <Checkbox
                            value={"Open"}
                            alignSelf={"flex-start"}
                            colorScheme='orange'
                            isChecked={activeTags.includes("Open")}
                        >
                            Open Pharmacies
                        </Checkbox>
                    </CheckboxGroup>

                </Flex>
            </MenuList>
        </Menu>
    )
}


export default TagsFilterMenu;