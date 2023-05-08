import { createContext, useEffect, useMemo, useState } from "react";



interface ActivitiesType {
    id: string,
    type: "review" | "state" | "link" | "update",
    action: "accepted" | "rejected" | "activation" | "deactivation" | "linked",
    description: string,
    date_created: string,
}

interface ChartType {
    "name": string,
    "count": number,
    "fill": string
}

export interface DashboardContextInterface {
    isLoading: Boolean,
    setIsLoading: React.Dispatch<React.SetStateAction<Boolean>>,
    lineChartDatas: any,
    setLineChartDatas: React.Dispatch<React.SetStateAction<any>>,
    reviewChartDatas: ChartType[],
    setReviewChartDatas: React.Dispatch<React.SetStateAction<ChartType[]>>,
    stateChartDatas: ChartType[],
    setStateChartDatas: React.Dispatch<React.SetStateAction<ChartType[]>>,
    activities: ActivitiesType[],
    setActivities: React.Dispatch<React.SetStateAction<ActivitiesType[]>>,

}


const backendUrl = process.env.REACT_APP_DJANGO_API_URL

export const DashboardContext = createContext<DashboardContextInterface | null>(null);

export const DashboardContextProvider = ({ children }: any) => {

    // STATES

    const [isLoading, setIsLoading] = useState<Boolean>(false)
    const [lineChartDatas, setLineChartDatas] = useState<any>([])
    const [reviewChartDatas, setReviewChartDatas] = useState<ChartType[]>([])
    const [stateChartDatas, setStateChartDatas] = useState<ChartType[]>([])
    const [activities, setActivities] = useState<ActivitiesType[]>([])


    const getStatistics = async () => {
        setIsLoading(true)
        try {


            const [lineChartResponse, reviewChartResponse, stateChartResponse, ActivitiesResponse] = await Promise.all([
                fetch(`${backendUrl}/admin-api/dashboard/get-pharmacies-over-weeks/`),
                fetch(`${backendUrl}/admin-api/dashboard/get-pharmacies-reviews-states/`),
                fetch(`${backendUrl}/admin-api/dashboard/get-pharmacies-states/`),
                fetch(`${backendUrl}/admin-api/dashboard/get-recent-activity/`),
            ])

            const lineChartDatas = await lineChartResponse.json()
            const reviewChartDatas = await reviewChartResponse.json()
            const stateChartDatas = await stateChartResponse.json()
            const ActivitiesDatas = await ActivitiesResponse.json()

            setLineChartDatas(lineChartDatas)
            setReviewChartDatas(reviewChartDatas)
            setStateChartDatas(stateChartDatas)
            setActivities(ActivitiesDatas)

            console.log("lineChartDatas", lineChartDatas)
            console.log("reviewChartDatas", reviewChartDatas)
            console.log("stateChartDatas", stateChartDatas)
            console.log("ActivitiesDatas", ActivitiesDatas)

        } catch (error) {
            console.log(error)
        }

        setIsLoading(false)
    }

    useEffect(() => {
        getStatistics()
    }, [])

    const value = useMemo(() => {
        return {
            isLoading,
            setIsLoading,
            lineChartDatas,
            setLineChartDatas,
            reviewChartDatas,
            setReviewChartDatas,
            stateChartDatas,
            setStateChartDatas,
            activities,
            setActivities
        }
    }, [
        isLoading,
        setIsLoading,
        lineChartDatas,
        setLineChartDatas,
        reviewChartDatas,
        setReviewChartDatas,
        stateChartDatas,
        setStateChartDatas,
        activities,
        setActivities
    ])
    return (
        <DashboardContext.Provider value={value}>
            {children}
        </DashboardContext.Provider>
    )
}