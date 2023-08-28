import { INavigationBarItemProps } from "@/types/interfaces";
import { NavLink } from "react-router-dom";



const NavigationBarItem: React.FC<INavigationBarItemProps> = ({
    to,
    icon: IconComponent,
    hoverClass = "hover:text-appBlack"
}) => {




    return (
        <NavLink to={to}>
            {
                ({ isActive }) => {
                    return <div className=
                        {` p-2 ${isActive
                            ? "text-appOrange rounded-md bg-white drop-shadow-md"
                            : `text-appGray hover:text-appBlack ${hoverClass} hover:drop-shadow-md hover:bg-appWhite rounded-md hover:ease-in transition duration-300`} `}>
                        {<IconComponent size={25} />}
                    </div>
                }
            }

        </NavLink>
    )
}


export default NavigationBarItem