import { IconType } from "react-icons"

interface IIconButtonProps {
    icon: IconType,
    onClick?: () => void
    hoverColor: "red" | "green" | "blue" | "appOrange"
    size?: number
}


const colorMap = {
    "red": "text-red-500",
    "green": "text-green-500",
    "blue": "text-blue-500",
    "appOrange": "text-appOrange"
}

const IconButton: React.FC<IIconButtonProps> = ({
    icon: IconComponent,
    onClick,
    hoverColor,
    size
}) => {


    const colorOnHover = colorMap[hoverColor] || "text-blue-500"




    return (<IconComponent
        className={`text-appBlack-500 cursor-pointer hover:${colorOnHover}`}
        size={size || 15}

    />)
}


export default IconButton