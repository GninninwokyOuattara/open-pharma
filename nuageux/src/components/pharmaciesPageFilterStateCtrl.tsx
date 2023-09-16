import { useEffect, useState } from "react"
import ThreeStatesButton from "./buttons/threeStatesButton"


const parseInitalState = (state: string | undefined) => {
    if (state === "true") return "true"
    else if (state === "false") return "false"
    else return "neutral"
}

interface PharmaciesPageFilterStateCtrlProps {
    activeInitialState: string | undefined,
    openInitialState: string | undefined,
    setOpenFilter: React.Dispatch<React.SetStateAction<string | undefined>>,
    setActiveFilter: React.Dispatch<React.SetStateAction<string | undefined>>
}

export type StateOptions = "neutral" | "true" | "false"

type StatesType = Record<"active" | "open", StateOptions>
const PharmaciesPageFilterStateCtrl: React.FC<PharmaciesPageFilterStateCtrlProps> = ({ setOpenFilter, setActiveFilter, activeInitialState, openInitialState }) => {



    const [states, setStates] = useState<StatesType>({
        active: parseInitalState(activeInitialState) || "neutral",
        open: parseInitalState(openInitialState) || "neutral"
    })

    const changeActiveState = (value: StateOptions) => {
        console.log(value)
        setStates({
            ...states,
            active: value,

        })
    }


    const changeOpenState = (value: StateOptions) => {
        setStates({
            ...states,
            open: value
        })
    }




    useEffect(() => {
        if (states.active == "neutral") {
            setActiveFilter(undefined)
        } else {
            setActiveFilter(states.active)
        }

        if (states.open == "neutral") {
            setOpenFilter(undefined)
        } else {
            setOpenFilter(states.open)
        }

    }, [states])


    return (
        <div className="border-[1px] rounded-md flex flex-row gap-2 items-center p-1">
            <p>Show : </p>
            <ThreeStatesButton
                title="Active"
                state={states.active}
                stateCtrlFunc={changeActiveState}

            />

            <ThreeStatesButton
                title="Open"
                state={states.open}
                stateCtrlFunc={changeOpenState}
                color="green"

            />

        </div>
    )
}

export default PharmaciesPageFilterStateCtrl