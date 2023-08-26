import { IconType } from "react-icons"

interface IIconButtonProps {
    icon: IconType,
    onClick?: () => void
    hoverColor: "red" | "green" | "blue" | "appOrange"
    size?: number
}




const IconButton: React.FC<IIconButtonProps> = ({
    icon: IconComponent,
    onClick,
    hoverColor,
    size
}) => {

    const colorMap = {
        "red": "hover:text-red-500",
        "green": "hover:text-green-500",
        "blue": "text-blue-500",
        "appOrange": "text-appOrange"
    }



    return (<IconComponent
        className={`cursor-pointer ${colorMap[hoverColor]}`}
        size={size || 15}
        onClick={onClick}

    />)
}


export default IconButton