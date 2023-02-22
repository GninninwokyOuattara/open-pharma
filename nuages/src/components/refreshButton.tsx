import { Button } from "@chakra-ui/react";
import { FiRefreshCcw } from "react-icons/fi";
import { palette } from "../colorPalette";
import animationStyles from "../styles/animation.module.css";

// import colorPalette


interface RefreshButtonProps {
    isLoading: boolean;
    onClick: () => void;

}

const RefreshButton: React.FC<RefreshButtonProps> = ({ isLoading, onClick }) => {


    return (
        <Button
            title="Refresh"

            boxShadow={"xs"}
            backgroundColor={"whiteAlpha.100"}
            border={"1px solid"}
            // borderColor={palette.orange.havePersonality}
            _hover={{
                border: "1px solid",
                borderColor: palette.orange.havePersonality,
                color: palette.orange.havePersonality
            }}
            disabled={isLoading}
            onClick={onClick}
            rightIcon={<FiRefreshCcw
                className={isLoading ? animationStyles.rotate : ""} />}
        >Refresh</Button>

    )
}

export default RefreshButton