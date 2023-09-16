import { getRecentActivity } from "@/api/dashboardApis";
import { RecentActivity } from "@/types/apiTypes";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { IconType } from "react-icons";
import { BiTask } from "react-icons/bi";
import { FiActivity } from 'react-icons/fi';
import { LuRefreshCcw } from "react-icons/lu";


const DashboardRecentActivity = () => {

    const query = useQuery({
        queryKey: ['dashboard-recent-activity'],
        queryFn: () => getRecentActivity()
    })



    return (

        <>
            <div className="hidden md:flex-grow w-96 p-2 overflow-y-scroll md:flex md:flex-col gap-2 shadow-md rounded-md bg-white">
                <h2 className="font-bold text-2xl">Recent Activity</h2>
                <div className="h-full overflow-y-scroll flex flex-col gap-2">
                    {
                        query.data?.data?.map((activity, index) => (
                            <Activity key={index} activity={activity} />
                        ))
                    }
                </div>

            </div>
        </>
    )
}



interface ActivityProps {
    activity: RecentActivity
}


const Activity: React.FC<ActivityProps> = ({ activity }) => {

    let IconActivity: IconType
    switch (activity.type) {
        case "actualization":
            IconActivity = LuRefreshCcw
            break
        case "review":
            IconActivity = BiTask
            break
        case "state":
            IconActivity = FiActivity
            break

        default:
            IconActivity = LuRefreshCcw

    }

    return (
        <div className="w-full flex flex-row items-start gap-2 hover:bg-appPrimary p-2 rounded-md">
            <div className="w-8 h-8 border-2 border-appOrange text-appOrange rounded-md overflow-hidden flex items-center justify-center">

                <IconActivity />
            </div>
            <div className="w-full">
                <p>{activity.description}</p>
                <p className="text-gray-400 text-sm">{moment(activity.date_created).startOf("hour").fromNow()}</p>

            </div>
        </div>
    )
}



export default DashboardRecentActivity