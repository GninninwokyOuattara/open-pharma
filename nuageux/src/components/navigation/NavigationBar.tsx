import { AiFillPieChart } from 'react-icons/ai'
import NavigationBarItem from './NavigationBarItem'

const NavigationBar = () => {
    return (
        <div
            className="h-14 w-full flex flex-row border-b-2  items-center p-1"
        >
            <div className="w-32 font-bold text-center">OpenPharma</div>

            <div className="w-full h-full flex items-center justify-center">

                <div className="border-2 rounded-md px-2 h-full flex flex-row gap-x-4 items-center bg-appPrimary">
                    <NavigationBarItem to={"/dashboard"} icon={<AiFillPieChart size={20} />} />
                    <div className="w-0.5 h-4/5 bg-gray-300" />
                    <NavigationBarItem to={"/pharmacies"} icon={<AiFillPieChart size={20} />} />
                    <div className="w-0.5 h-4/5 bg-gray-300" />

                    <NavigationBarItem to="/reviews" icon={<AiFillPieChart size={20} />} />
                </div>

            </div>
            <div className="w-32 text-center font-bold">logout</div>

            {/* <div className="w-30">Logout</div> */}


        </div>
    )
}

export default NavigationBar