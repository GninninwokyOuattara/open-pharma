import { getPharmaciesAllStatesForPieChart } from "@/api/dashboardApis";
import ToastUiPieChart from "@/components/charts/toastuiChart";
import DashboardSummary from "@/components/dashbordSummary";
import withNavigationBarLayout from "@/components/layout/withNavigationBarLayout";
import { useQuery } from "@tanstack/react-query";

import '@toast-ui/chart/dist/toastui-chart.min.css';





function dashboard() {


    const query = useQuery({
        queryKey: ['dashboard-pie-chart'],
        queryFn: () => getPharmaciesAllStatesForPieChart()

    })

    if (query.data)


        return (

            <div className="w-full flex flex-col md:flex-row h-[calc(100vh-3.5rem)] gap-2 p-2 flex ">
                <ToastUiPieChart chartDatas={query.data.data} />
                <DashboardSummary data={query.data.data} />

            </div>
        )
}

export default withNavigationBarLayout(dashboard)




