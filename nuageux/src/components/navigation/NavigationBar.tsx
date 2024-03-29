import { AiFillPieChart } from 'react-icons/ai';
import { GiChoice } from "react-icons/gi";
import { IoLogOutOutline } from "react-icons/io5";
import { RiFileList3Fill } from "react-icons/ri";


import { useAuth } from '@/contexts/auth';
import NavigationBarItem from './NavigationBarItem';

const NavigationBar = () => {

    const { logout } = useAuth();
    return (
        <div
            className="h-14 w-full flex flex-row border-b-2  items-center p-1 border-appPrimary lg:rounded-md justify-between sticky top-0 left-0 bg-appPrimary z-50"
        >
            <div className="w-32 font-bold text-center text-xl ">Open<span className="text-green-500">Pharma</span></div>

            <div className="h-full flex items-center justify-center">

                <div className="px-5 h-full flex flex-row gap-x-4 items-center ">
                    <NavigationBarItem to={"/dashboard"} icon={AiFillPieChart} />
                    <NavigationBarItem to={"/pharmacies"} icon={RiFileList3Fill} />
                    <NavigationBarItem to="/reviews" icon={GiChoice} />

                    <IoLogOutOutline
                        size={42}
                        onClick={logout}
                        className={`p-2 text-appGray hover:text-appBlack hover:drop-shadow-md hover:bg-appWhite rounded-md hover:ease-in transition duration-200 hover:text-red-500`}
                    />


                </div>

            </div>


        </div>
    )
}

export default NavigationBar