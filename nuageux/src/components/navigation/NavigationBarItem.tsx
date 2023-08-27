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
                        {`${isActive ? "text-appOrange" : "text-appGray hover:text-appBlack"} ${hoverClass}`}>
                        {<IconComponent size={25} />}
                    </div>
                }
            }

        </NavLink>
    )
}


export default NavigationBarItem