import withNavigationBarLayout from "@/components/layout/withNavigationBarLayout";

import { NestedPieChart } from "@toast-ui/chart";
import '@toast-ui/chart/dist/toastui-chart.min.css';

import { useEffect } from "react";




const data = {
    categories: ['Pharmacies activities states', 'Pharmacies review states', 'Pharmacies open states'],
    series: [
        {
            name: 'pharmaciesStates',
            data: [
                {
                    name: 'Actives',
                    data: 50,
                },
                {
                    name: 'Inactives',
                    data: 20,
                },

            ],
        },
        {
            name: 'reviewState',
            data: [
                {
                    name: 'Reviewed and actives',
                    //parentName: 'Actives',
                    data: 50,
                },

                {
                    name: 'Reviewed and inactives',
                    //parentName: 'Inactives',
                    data: 15,
                },
                {
                    name: 'Not yet reviewed',
                    //parentName: 'Inactives',
                    data: 5,
                },

            ],
        },
        {
            name: 'openStates',
            data: [
                {
                    name: 'Actives and open',
                    //parentName: 'Reviewed and actives',
                    data: 20,
                },
                {
                    name: 'Actives but not open',
                    //parentName: 'Reviewed and actives',
                    data: 30,
                },
                {
                    name: 'Inactives but open',
                    //parentName: 'Reviewed and inactives',
                    data: 10,
                },

                {
                    name: 'Inactives and not open',
                    //parentName: 'Reviewed and inactives',
                    data: 5,
                },
                {
                    name: 'Pending review but open',
                    //parentName: 'Not yet reviewed',
                    data: 3,
                },
                {
                    name: 'Pending review and not open',
                    //parentName: 'Not yet reviewed',
                    data: 2,
                },

            ],
        },


    ],
};

const options = {
    legend: {
        visible: false
    },
    theme: {
        series: {
            colors: ['#7dd3fc', '#737373', 'white', '#e7e5e4', '#737373', '#34d399', '#ffffff', '#34d399', '#ffffff', '#34d399', '#ffffff'],

        }
    },
    chart: {
        // title: "Nested Pie Chart",
        height: 500,
        // width: 700
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
                visible: true,
                // pieSeriesName: {
                //     visible: true
                // }
            }
        },
        openStates: {
            radiusRange: {
                inner: "90%",
                outer: "100%"
            },

        }
    },
    exportMenu: {
        visible: false
    }
};



function dashboard() {

    const el = document.getElementById("chart");

    useEffect(() => {
        let chart: NestedPieChart
        if (el) {
            console.log(el)
            chart = new NestedPieChart({ el, data, options });

        }

        return () => {
            if (chart) chart.destroy();
        }
    })


    return (
        <div id="chart" className="w-full border-4">dashboard</div>
    )
}

export default withNavigationBarLayout(dashboard)