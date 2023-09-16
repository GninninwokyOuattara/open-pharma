import { getPharmaciesAllStatesForPieChart } from "@/api/dashboardApis";
import ToastUiPieChart from "@/components/charts/toastuiChart";
import DashboardRecentActivity from "@/components/dashboardRecentActivity";
import DashboardSummary from "@/components/dashbordSummary";
import withNavigationBarLayout from "@/components/layout/withNavigationBarLayout";
import LeafletMap from "@/components/leafletMap";
import { useQuery } from "@tanstack/react-query";

import '@toast-ui/chart/dist/toastui-chart.min.css';





function dashboard() {


    const query = useQuery({
        queryKey: ['dashboard-pie-chart'],
        queryFn: () => getPharmaciesAllStatesForPieChart()

    })

    if (query.data)


        return (

            <div className="w-full flex flex-col  h-[calc(100vh-3.5rem)] gap-2 p-2 flex-col">
                <div className="w-full flex flex-col md:flex-row gap-2">
                    <ToastUiPieChart chartDatas={query.data.data} />
                    <DashboardSummary data={query.data.data} />

                </div>

                <div className="md:flex-grow overflow-y-scroll md:flex md:flex-row gap-2 p-1">
                    <DashboardRecentActivity />
                    <LeafletMap />
                </div>
                {/* <DashboardRecentActivity /> */}
                {/* <div className="w-full border-2">Map</div> */}


            </div>
        )
}

export default withNavigationBarLayout(dashboard)




