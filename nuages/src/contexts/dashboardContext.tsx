import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ToastContext, ToastContextInterface } from "./toast";
import { useUserAuthContext } from "./userAuthContext";



interface ActivitiesType {
    id: string,
    type: "review" | "state" | "link" | "update" | "actualization",
    action: "accepted" | "rejected" | "activation" | "deactivation" | "linked" | "manual" | "automatic",
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


const backendUrl = import.meta.env.VITE_APP_DJANGO_API_URL

export const DashboardContext = createContext<DashboardContextInterface | null>(null);



export const DashboardContextProvider = ({ children }: any) => {

    // get succesToast from context
    const { successToast, errorToast
    } = useContext(ToastContext) as ToastContextInterface

    const { authData, logout } = useUserAuthContext()
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
        if (authData && "access" in authData) {

            try {


                const [lineChartResponse, reviewChartResponse, stateChartResponse, ActivitiesResponse, updateSummary] = await Promise.all([
                    fetch(`${backendUrl}/admin-api/dashboard/get-pharmacies-over-weeks/`, {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${authData.access}`
                        }
                    }),
                    fetch(`${backendUrl}/admin-api/dashboard/get-pharmacies-reviews-states/`, {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${authData.access}`
                        }
                    }),
                    fetch(`${backendUrl}/admin-api/dashboard/get-pharmacies-states/`, {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${authData.access}`
                        }
                    }),
                    fetch(`${backendUrl}/admin-api/dashboard/get-recent-activity/`, {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${authData.access}`
                        }
                    }),
                    fetch(`${backendUrl}/admin-api/dashboard/get-latest-tracker-results/`, {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${authData.access}`
                        }
                    }),

                ])

                if (lineChartResponse.status === 200) {
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

                } else if (lineChartResponse.status === 401) {
                    logout()
                } else {
                    errorToast("Error", "Something went wrong")
                }





            } catch (error) {
                console.log(error)
            }
        }

        setIsLoading(false)
    }, [
        setIsLoading,
        setLineChartDatas,
        setReviewChartDatas,
        setStateChartDatas,
        setActivities,
        setUpdateSummary,
        authData,
        logout

    ])

    const triggerActualization = useCallback(async () => {

        if (authData && "access" in authData) {

            try {
                const response = await fetch(`${backendUrl}/admin-api/trigger-actualizer/`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${authData.access}`
                    }
                })



                const data = await response.json()

                const message = data.message
                successToast("Success", message)
                await getStatistics()
                console.log(data)


            } catch (error) {
                errorToast("Error", "Something went wrong")
                console.log(error)
            }
        } else {
            logout()
        }

    }, [authData])





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