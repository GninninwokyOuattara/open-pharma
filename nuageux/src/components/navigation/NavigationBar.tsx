import { Separator } from "@/components/ui/separator";
import { AiFillPieChart } from 'react-icons/ai';
import { GiChoice } from "react-icons/gi";
import { IoLogOutOutline } from "react-icons/io5";
import { RiFileList3Fill } from "react-icons/ri";


import NavigationBarItem from './NavigationBarItem';

const NavigationBar = () => {
    return (
        <div
            className="h-14 w-full flex flex-row border-b-2  items-center p-1 border-2 justify-between"
        >
            <div className="w-32 font-bold text-center">OpenPharma</div>

            <div className="h-full flex items-center justify-center">

                <div className="px-5 h-full flex flex-row gap-x-4 items-center ">
                    <NavigationBarItem to={"/dashboard"} icon={<AiFillPieChart size={25} />} />
                    <Separator orientation='vertical' />
                    <NavigationBarItem to={"/pharmacies"} icon={<RiFileList3Fill size={25} />} />
                    <Separator orientation='vertical' />
                    <NavigationBarItem to="/reviews" icon={<GiChoice size={25} />} />
                    <Separator orientation='vertical' />
                    <NavigationBarItem to="/" icon={<IoLogOutOutline size={25} />} />


                </div>

            </div>
            {/* <div className="w-32 text-center font-bold">logout</div> */}

            {/* <div className="w-30">Logout</div> */}


        </div>
    )
}

export default NavigationBar