import { PharmaciesAllStatesResponse } from "@/types/apiTypes"


interface ChartInfoDetailProps {
    text: string,
    color: string,
    value: number
}
const ChartInfoDetail: React.FC<ChartInfoDetailProps> = ({ text, color, value }) => {


    const backgoroundColor = `bg-${color}`
    const valueColor = `text-${color}`


    return (
        <div className="w-full h-8 rounded-md p-1 flex items-center gap-2 bg-appWhite shadow transition-shadow ease-in-out duration-500 shadow-appPrimary-500 cursor-pointer hover:bg-appPrimary">
            <div className={`w-4 h-4 rounded-md ${backgoroundColor}`}></div>
            <span className={`${valueColor} w-7`}>{value}</span>
            <p>{text}</p>
        </div>
    )
}



interface DashboardSummaryProps {

    data: PharmaciesAllStatesResponse
}
const DashboardSummary: React.FC<DashboardSummaryProps> = ({ data }) => {
    return (
        <div className="w-full h-fit md:h-[21rem] md:w-1/2 p-2 flex flex-col gap-2 shadow-md rounded-md">
            <h1 className="text-2xl">Summary</h1>
            <ChartInfoDetail
                text="Actives pharmacies"
                color="blue-500"
                value={data.actives}
            />
            <ChartInfoDetail
                text="Inactives pharmacies"
                color="gray-500"
                value={data.inactives_reviewed}
            />
            <ChartInfoDetail
                text="Pharmacies awaiting review"
                color="orange-500"
                value={data.inactives_pending_review}
            />


            <ChartInfoDetail
                text="Open and visible to users"
                color="green-500"
                value={data.actives_open}
            />
            <ChartInfoDetail
                text="Open in inactives pharmacies"
                color="green-500"
                value={data.inactives_reviewed_open}
            />
            <ChartInfoDetail
                text="Open in pharmacies pending reviews"
                color="green-500"
                value={data.inactives_pending_review_open}
            />
        </div>
    )
}

export default DashboardSummary