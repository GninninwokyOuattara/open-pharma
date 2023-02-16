import { SearchIcon } from "@chakra-ui/icons";
import { Box, Icon, Input } from "@chakra-ui/react";
import { useRef } from "react";


interface SearchBarProps {
    onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onChange }) => {

    const delayedSearchId = useRef<any>(null)

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (delayedSearchId.current) {
            clearTimeout(delayedSearchId.current)
        }
        delayedSearchId.current = setTimeout(() => {
            onChange(value)
        }, 500)
    }


    return (
        <Box
            width={"300px"}
            height={"40px"}
            border={"1px solid"}
            shadow={"sm"}
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
                onChange={(e) => { handleSearch(e) }}

            ></Input>
        </Box>
    )
}

export default SearchBar;