import { Separator } from "@/components/ui/separator";
import { AiFillPieChart } from 'react-icons/ai';
import { GiChoice } from "react-icons/gi";
import { IoLogOutOutline } from "react-icons/io5";
import { RiFileList3Fill } from "react-icons/ri";


import NavigationBarItem from './NavigationBarItem';

const NavigationBar = () => {
    return (
        <div
            className="h-14 w-full flex flex-row border-b-2  items-center p-1 border-appPrimary justify-between sticky top-0 left-0 bg-white z-50"
        >
            <div className="w-32 font-bold text-center text-xl ">Open<span className="text-green-500">Pharma</span></div>

            <div className="h-full flex items-center justify-center">

                <div className="px-5 h-full flex flex-row gap-x-4 items-center ">
                    <NavigationBarItem to={"/dashboard"} icon={AiFillPieChart} />
                    <Separator orientation='vertical' className="bg-appPrimary" />
                    <NavigationBarItem to={"/pharmacies"} icon={RiFileList3Fill} />
                    <Separator orientation='vertical' className="bg-appPrimary" />
                    <NavigationBarItem to="/reviews" icon={GiChoice} />
                    <Separator orientation='vertical' className="bg-appPrimary" />
                    <NavigationBarItem
                        to="/"
                        icon={IoLogOutOutline}
                        hoverClass={"hover:text-red-500"}
                    />


                </div>

            </div>


        </div>
    )
}

export default NavigationBar