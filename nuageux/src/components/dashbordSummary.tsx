import { PharmaciesAllStatesResponse } from "@/types/apiTypes"
import { useNavigate } from "react-router-dom"


interface ChartInfoDetailProps {
    text: string,
    color: "green" | "blue" | "orange" | "gray",
    value: number,
    to?: "/pharmacies" | "/reviews",
    filterString?: string
}
const ChartInfoDetail: React.FC<ChartInfoDetailProps> = ({ text, color, value, to, filterString }) => {

    const navigate = useNavigate()


    const backgoroundColor = `bg-${color}`
    const valueColor = `text-${color}`
    const textColorVariants = {
        green: "text-green-500",
        blue: "text-[#92d1f8]",
        orange: "text-orange-500",
        gray: "text-gray-500",
    }
    const colorVariants = {
        green: "bg-green-500",
        blue: "bg-[#92d1f8]",
        orange: "bg-orange-500",
        gray: "bg-gray-500",
    }


    const handleClick = () => {
        if (to) {
            if (filterString) return navigate({
                pathname: to,
                search: `?${filterString}`
            })
            return navigate({
                pathname: to
            })
        }
    }

    return (
        <div
            className={`w-full  h-8 rounded-md p-1 flex items-center gap-2 bg-appWhite shadow transition-shadow ease-in-out duration-500 shadow-appPrimary-500 cursor-pointer hover:bg-appPrimary`}
            onClick={() => handleClick()}
        >
            <div className={`w-4 h-4 rounded-md ${colorVariants[color]}`}></div>
            <span className={`${textColorVariants[color]} w-7`}>{value}</span>
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
            <h1 className="font-bold text-2xl">Summary</h1>
            <ChartInfoDetail
                text="Actives pharmacies"
                color="blue"
                value={data.actives}
                to="/pharmacies"
                filterString="active=true"
            />
            <ChartInfoDetail
                text="Inactives pharmacies"
                color="gray"
                value={data.inactives_reviewed}
                to="/pharmacies"
                filterString="active=false"
            />
            <ChartInfoDetail
                text="Pharmacies awaiting review"
                color="orange"
                value={data.inactives_pending_review}
                to="/reviews"
            />


            <ChartInfoDetail
                text="Open and visible to users"
                color="green"
                value={data.actives_open}
                to="/pharmacies"
                filterString="open=true"
            />
            <ChartInfoDetail
                text="Open in inactives pharmacies"
                color="green"
                value={data.inactives_reviewed_open}
                to="/pharmacies"
                filterString="active=false&open=true"
            />
            <ChartInfoDetail
                text="Open in pharmacies pending reviews"
                color="green"
                value={data.inactives_pending_review_open}
                to="/reviews"
                filterString="open=true"
            />
        </div>
    )
}

export default DashboardSummary