import { getPharmaciesAllStatesForPieChart } from "@/api/dashboardApis";
import withNavigationBarLayout from "@/components/layout/withNavigationBarLayout";
import { useQuery } from "@tanstack/react-query";

import { NestedPieChart } from "@toast-ui/chart";
import '@toast-ui/chart/dist/toastui-chart.min.css';

import { useEffect, useRef } from "react";




const options = {
    legend: {
        visible: false
    },
    theme: {
        series: {
            colors: ['#7dd3fc', '#737373', '#ffffff00', '#e7e5e4', '#fb923c', '#34d399', '#ffffff00', '#34d399', '#ffffff00', '#34d399', '#ffffff00'],

        }
    },
    chart: {
        // title: "Nested Pie Chart",
        height: 800,
        width: 700
    },
    series: {

        pharmaciesStates: {
            radiusRange: {
                inner: "20%",
                outer: "50%"
            },
            dataLabels: {
                visible: true

            }


        },
        reviewState: {
            radiusRange: {
                inner: "55%",
                outer: "85%"
            },
            dataLabels: {
                // visible: true,
                // pieSeriesName: {
                //     visible: true
                // }
            }
        },
        openStates: {
            radiusRange: {
                inner: "90%",
                outer: "110%"
            },
            dataLabels: {
                fontSize: 13,
                visible: true,
                pieSeriesName: {
                    visible: true,
                    anchor: 'outer',

                },
            }

        }
    },
    exportMenu: {
        visible: false
    }
};



function dashboard() {


    const query = useQuery({
        queryKey: ['dashboard-pie-chart'],
        queryFn: () => getPharmaciesAllStatesForPieChart()

    })


    const pieRef = useRef(null)


    useEffect(() => {
        let chart: NestedPieChart
        if (!query.isLoading) {
            const queryData = query?.data?.data
            const data = {
                categories: ['Pharmacies activities states',
                    'Pharmacies review states',
                    'Pharmacies open states'],
                series: [
                    {
                        name: 'pharmaciesStates',
                        data: [
                            {
                                name: 'Actives',
                                data: queryData?.actives,
                            },
                            {
                                name: 'Inactives',
                                data: queryData?.inactives,
                            },

                        ],
                    },
                    {
                        name: 'reviewState',
                        data: [
                            {
                                name: 'Reviewed and actives',
                                //parentName: 'Actives',
                                data: queryData?.actives_reviewed,
                            },

                            {
                                name: 'Reviewed and inactives',
                                //parentName: 'Inactives',
                                data: queryData?.inactives_reviewed,
                            },
                            {
                                name: 'Not yet reviewed',
                                //parentName: 'Inactives',
                                data: queryData?.inactives_pending_review,
                            },

                        ],
                    },
                    {
                        name: 'openStates',
                        data: [
                            {
                                name: `user visible (${queryData?.actives_open})`,
                                //parentName: 'Reviewed and actives',
                                data: queryData?.actives_open,
                            },
                            {
                                name: 'Actives but not open',
                                //parentName: 'Reviewed and actives',
                                data: queryData?.actives_not_open,
                            },
                            {
                                name: `currently inactives (${queryData?.inactives_reviewed_open})`,
                                //parentName: 'Reviewed and inactives',
                                data: queryData?.inactives_reviewed_open,
                            },

                            {
                                name: 'Inactives and not open',
                                //parentName: 'Reviewed and inactives',
                                data: queryData?.inactives_reviewed_not_open,
                            },
                            {
                                name: `Awaiting review (${queryData?.inactives_pending_review_open})`,
                                //parentName: 'Not yet reviewed',
                                data: queryData?.inactives_pending_review_open,
                            },
                            {
                                name: 'Pending review and not open',
                                //parentName: 'Not yet reviewed',
                                data: queryData?.inactives_pending_review_not_open,
                            },

                        ],
                    },


                ],
            };



            const el = document.getElementById("chart");

            if (el) {
                console.log(el)
                chart = new NestedPieChart({ el, data, options });

            }
        }

        return () => {
            if (chart) chart.destroy();
        }
    }, [query])


    return (
        <div id="chart" ref={pieRef} className="w-full border-4 p-10">dashboard</div>
    )
}

export default withNavigationBarLayout(dashboard)