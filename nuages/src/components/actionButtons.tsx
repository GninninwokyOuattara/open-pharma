import { IconButton } from "@chakra-ui/react"
import { FiCheck, FiX } from "react-icons/fi"
import { TbPlugConnected } from "react-icons/tb"

interface ReviewButtonProps {
    onClick: () => void
    for: "validate" | "invalidate" | "link"
    // rowIsLoading: boolean
}

export const ReviewButton: React.FC<ReviewButtonProps> = (props) => {
    const icon = props.for === "validate" ? <FiCheck /> : props.for === "invalidate" ? <FiX /> : <TbPlugConnected />
    return (
        <IconButton
            aria-label={props.for}
            icon={icon}
            onClick={props.onClick}
            size={"sm"}
            variant={"ghost"}

        />
    )
}