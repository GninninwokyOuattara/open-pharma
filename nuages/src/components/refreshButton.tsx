import { Button } from "@chakra-ui/react";
import { FiRefreshCcw } from "react-icons/fi";
import animationStyles from "../styles/animation.module.css";



interface RefreshButtonProps {
    isLoading: boolean;
    onClick: () => void;

}

const RefreshButton: React.FC<RefreshButtonProps> = ({ isLoading, onClick }) => {


    return (
        <Button
            title="Refresh"

            boxShadow={"md"}
            disabled={isLoading}
            onClick={onClick}
            rightIcon={<FiRefreshCcw
                className={isLoading ? animationStyles.rotate : ""} />}
        >Refresh</Button>

    )
}

export default RefreshButton