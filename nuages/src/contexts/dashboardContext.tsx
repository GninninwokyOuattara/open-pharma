import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ToastContext, ToastContextInterface } from "./toast";



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

interface UpdateSummary {
    id: string,
    start_time: string,
    end_time: string,
    duration: string,
    date_created: Date,
    date_updated: Date,
    inserted_pharmacies: number,
    updated_pharmacies: number,
    skipped_pharmacies: number,
    already_open_pharmacies: number,
    mode: "manual" | "automatic",
}

export interface DashboardContextInterface {
    isLoading: boolean,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    lineChartDatas: any,
    setLineChartDatas: React.Dispatch<React.SetStateAction<any>>,
    reviewChartDatas: ChartType[],
    setReviewChartDatas: React.Dispatch<React.SetStateAction<ChartType[]>>,
    stateChartDatas: ChartType[],
    setStateChartDatas: React.Dispatch<React.SetStateAction<ChartType[]>>,
    activities: ActivitiesType[],
    setActivities: React.Dispatch<React.SetStateAction<ActivitiesType[]>>,
    updateSummary: UpdateSummary,
    setUpdateSummary: React.Dispatch<React.SetStateAction<UpdateSummary>>,
    getStatistics: () => Promise<void>,
    triggerActualization: () => Promise<void>

}


const backendUrl = process.env.REACT_APP_DJANGO_API_URL

export const DashboardContext = createContext<DashboardContextInterface | null>(null);



export const DashboardContextProvider = ({ children }: any) => {

    // get succesToast from context
    const { successToast, errorToast
    } = useContext(ToastContext) as ToastContextInterface

    // STATES

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [lineChartDatas, setLineChartDatas] = useState<any>([])
    const [reviewChartDatas, setReviewChartDatas] = useState<ChartType[]>([])
    const [stateChartDatas, setStateChartDatas] = useState<ChartType[]>([])
    const [activities, setActivities] = useState<ActivitiesType[]>([])
    const [updateSummary, setUpdateSummary] = useState<UpdateSummary>({
        id: "",
        start_time: "",
        end_time: "",
        duration: "",
        date_created: new Date(),
        date_updated: new Date(),
        inserted_pharmacies: 0,
        updated_pharmacies: 0,
        skipped_pharmacies: 0,
        already_open_pharmacies: 0,
        mode: "manual",
    })


    const getStatistics = useCallback(async () => {
        setIsLoading(true)
        try {


            const [lineChartResponse, reviewChartResponse, stateChartResponse, ActivitiesResponse, updateSummary] = await Promise.all([
                fetch(`${backendUrl}/admin-api/dashboard/get-pharmacies-over-weeks/`),
                fetch(`${backendUrl}/admin-api/dashboard/get-pharmacies-reviews-states/`),
                fetch(`${backendUrl}/admin-api/dashboard/get-pharmacies-states/`),
                fetch(`${backendUrl}/admin-api/dashboard/get-recent-activity/`),
                fetch(`${backendUrl}/admin-api/dashboard/get-latest-tracker-results/`),

            ])

            const lineChartDatas = await lineChartResponse.json()
            const reviewChartDatas = await reviewChartResponse.json()
            const stateChartDatas = await stateChartResponse.json()
            const ActivitiesDatas = await ActivitiesResponse.json()
            const updateSummaryDatas = await updateSummary.json()


            setLineChartDatas(lineChartDatas)
            setReviewChartDatas(reviewChartDatas)
            setStateChartDatas(stateChartDatas)
            setActivities(ActivitiesDatas)
            console.log("", updateSummary)

            setUpdateSummary(updateSummaryDatas[0] || {
                id: "",
                start_time: "",
                end_time: "",
                duration: "",
                date_created: new Date(),
                date_updated: new Date(),
                inserted_pharmacies: 0,
                updated_pharmacies: 0,
                skipped_pharmacies: 0,
                already_open_pharmacies: 0,
                mode: "manual",
            })

            console.log("lineChartDatas", lineChartDatas)
            console.log("reviewChartDatas", reviewChartDatas)
            console.log("stateChartDatas", stateChartDatas)
            console.log("ActivitiesDatas", ActivitiesDatas)
            console.log("updateSummary", updateSummaryDatas[0])

        } catch (error) {
            console.log(error)
        }

        setIsLoading(false)
    }, [
        setIsLoading,
        setLineChartDatas,
        setReviewChartDatas,
        setStateChartDatas,
        setActivities,
        setUpdateSummary

    ])

    const triggerActualization = useCallback(async () => {

        try {
            const response = await fetch(`${backendUrl}/admin-api/trigger-actualizer/`)



            const data = await response.json()

            const message = data.message
            successToast("Success", message)
            await getStatistics()
            console.log(data)


        } catch (error) {
            errorToast("Error", "Something went wrong")
            console.log(error)
        }

    }, [])





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
            setActivities,
            updateSummary,
            setUpdateSummary,
            getStatistics,
            triggerActualization
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
        setActivities,
        updateSummary,
        setUpdateSummary,
        getStatistics,
        triggerActualization
    ])
    return (
        <DashboardContext.Provider value={value}>
            {children}
        </DashboardContext.Provider>
    )
}