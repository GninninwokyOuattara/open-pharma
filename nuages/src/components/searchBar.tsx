import { SearchIcon } from "@chakra-ui/icons";
import { Box, Icon, Input } from "@chakra-ui/react";


interface SearchBarProps {
    onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onChange }) => {



    return (
        <Box
            width={"300px"}
            height={"40px"}
            border={"1px solid #E2E8F0"}
            borderRadius={"md"}
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
            paddingLeft={"10px"}

        >

            <Icon
                as={SearchIcon}
                color={"gray.400"}
            />
            <Input
                width={"full"}
                height={"full"}
                border={"none"}
                placeholder={"Search a pharmacy"}
                outline={"none"}
                _focus={{ boxShadow: "none", }}
                onChange={(e) => { }}

            ></Input>
        </Box>
    )
}

export default SearchBar;