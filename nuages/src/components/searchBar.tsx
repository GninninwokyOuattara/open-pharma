import { SearchIcon } from "@chakra-ui/icons";
import { Box, Icon, Input } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { palette } from "../colorPalette";


interface SearchBarProps {
    onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onChange }) => {

    const [isFocused, setIsFocused] = useState<boolean>(false);
    const delayedSearchId = useRef<any>(null)

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (delayedSearchId.current) {
            clearTimeout(delayedSearchId.current)
        }
        delayedSearchId.current = setTimeout(() => {
            onChange(value)
        }, 300)
    }


    return (
        <Box
            width={"300px"}
            height={"40px"}
            border={"1px solid"}
            shadow={"xs"}
            borderRadius={"md"}

            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
            paddingLeft={"10px"}
            backgroundColor={"whiteAlpha.100"}
            _hover={{
                border: "1px solid orange",

            }}
            borderColor={isFocused ? palette.orange.sexy : ""}

        >

            <Icon
                as={SearchIcon}
                color={"black"}
            />
            <Input
                width={"full"}
                height={"full"}
                border={"none"}
                placeholder={"Search a pharmacy"}
                outline={"none"}
                _focus={{ boxShadow: "none", }}
                onChange={(e) => { handleSearch(e) }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}

            ></Input>
        </Box>
    )
}

export default SearchBar;