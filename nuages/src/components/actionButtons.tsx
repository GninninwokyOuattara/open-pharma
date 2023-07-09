import { IconButton } from "@chakra-ui/react"
import { FaClipboardList } from "react-icons/fa"
import { FiCheck, FiX } from "react-icons/fi"
import { TbPlugConnected } from "react-icons/tb"
import { palette } from "../colorPalette"

interface ReviewButtonProps {
    onClick: () => void
    for: "validate" | "invalidate" | "link" | "review"
    // rowIsLoading: boolean
}

export const ReviewButton: React.FC<ReviewButtonProps> = (props) => {
    const icon = props.for === "validate" ? <FiCheck />
        : props.for === "invalidate" ? <FiX />
            : props.for === "review" ? <FaClipboardList /> : <TbPlugConnected />
    return (
        <IconButton
            aria-label={props.for}
            icon={icon}
            onClick={props.onClick}
            size={"sm"}
            variant={"ghost"}
            _hover={{ bg: palette.custom.niceOrange }}

        />
    )
}