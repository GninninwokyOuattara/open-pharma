import { INavigationBarItemProps } from "@/types/interfaces";
import { NavLink } from "react-router-dom";

const NavigationBarItem: React.FC<INavigationBarItemProps> = ({ to, icon }) => {


    return (
        <NavLink to={to}>
            {
                ({ isActive }) => {
                    return <div className=
                        {`${isActive ? "text-appOrange" : "text-appGray hover:text-appBlack"} `}>
                        {icon}
                    </div>
                }
            }

        </NavLink>
    )
}


export default NavigationBarItem