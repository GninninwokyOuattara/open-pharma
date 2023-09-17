import { PharmaciesAllStatesResponse } from "@/types/apiTypes";
import { NestedPieChart } from "@toast-ui/chart";
import '@toast-ui/chart/dist/toastui-chart.min.css';
import { useEffect } from "react";

interface ToastUiPieChartProps {
    chartDatas: PharmaciesAllStatesResponse
}
const ToastUiPieChart: React.FC<ToastUiPieChartProps> = ({ chartDatas }) => {

    const options = {
        legend: {
            visible: false
        },
        theme: {
            series: {
                colors: [
                    //Activities states
                    '#7dd3fc', // blue 
                    '#737373', // gray

                    //Review states
                    '#ffffff00', // white
                    '#e7e5e4',  // light gray
                    '#fb923c', // red

                    //Open states
                    '#34d399', // green
                    '#ffffff00', // white
                    '#34d399', // green
                    '#ffffff00', // white
                    '#34d399', // white
                    '#34d399' // green
                ],

            }
        },
        chart: {
            // title: "Nested Pie Chart",
            height: 300,
            // width: 368
        },
        series: {

            pharmaciesStates: {
                radiusRange: {
                    inner: "20%",
                    outer: "50%"
                },
                dataLabels: {
                    // visible: true

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
                    // visible: true,
                    pieSeriesName: {
                        // visible: true,
                        anchor: 'outer',

                    },
                }

            }
        },
        exportMenu: {
            visible: false
        }
    };




    useEffect(() => {
        let chart: NestedPieChart

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
                            data: chartDatas?.actives,
                        },
                        {
                            name: 'Inactives',
                            data: chartDatas?.inactives,
                        },

                    ],
                },
                {
                    name: 'reviewState',
                    data: [
                        {
                            name: 'Reviewed and actives',
                            //parentName: 'Actives',
                            data: chartDatas?.actives_reviewed,
                        },

                        {
                            name: 'Reviewed and inactives',
                            //parentName: 'Inactives',
                            data: chartDatas?.inactives_reviewed,
                        },
                        {
                            name: 'Not yet reviewed',
                            //parentName: 'Inactives',
                            data: chartDatas?.inactives_pending_review,
                        },

                    ],
                },
                {
                    name: 'openStates',
                    data: [
                        {
                            name: `Actives and open (${chartDatas?.actives_open})`,
                            //parentName: 'Reviewed and actives',
                            data: chartDatas?.actives_reviewed,
                        },
                        {
                            name: 'Actives but not open',
                            //parentName: 'Reviewed and actives',
                            data: chartDatas.actives_not_open,
                        },
                        {
                            name: `Inactives and open (${chartDatas?.inactives_reviewed_open})`,
                            //parentName: 'Reviewed and inactives',
                            data: chartDatas?.inactives_reviewed_open,
                        },

                        {
                            name: 'Reviewed inactives and not open',
                            //parentName: 'Reviewed and inactives',
                            data: chartDatas.inactives_reviewed_not_open,
                        },
                        {
                            name: `Pending review and open (${chartDatas?.inactives_pending_review_open})`,
                            //parentName: 'Not yet reviewed',
                            data: chartDatas?.inactives_pending_review,
                        },
                        {
                            name: 'Pending review and not open',
                            //parentName: 'Not yet reviewed',
                            data: chartDatas.inactives_pending_review_not_open,
                        },

                    ],
                },


            ],
        };



        const el = document.getElementById("chart");

        if (el) {
            chart = new NestedPieChart({ el, data, options });

        }


        return () => {
            if (chart) chart.destroy();
        }
    })



    return (
        <div className="w-full h-fit md:h-[21rem] md:w-1/2 rounded-md shadow-md overflow-hidden">
            <h1 className="font-bold text-2xl ml-2 mb-2 text-center hidden md:block">Pharmacies States</h1>
            <div id="chart"></div>
        </div>
    )
}

export default ToastUiPieChart