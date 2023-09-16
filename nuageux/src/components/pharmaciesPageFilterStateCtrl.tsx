import { useEffect, useState } from "react"
import ThreeStatesButton from "./buttons/threeStatesButton"


interface PharmaciesPageFilterStateCtrlProps {
    setOpenFilter: React.Dispatch<React.SetStateAction<string | undefined>>,
    setActiveFilter: React.Dispatch<React.SetStateAction<string | undefined>>
}

export type StateOptions = "neutral" | "true" | "false"

type StatesType = Record<"active" | "open", StateOptions>
const PharmaciesPageFilterStateCtrl: React.FC<PharmaciesPageFilterStateCtrlProps> = ({ setOpenFilter, setActiveFilter }) => {

    const [states, setStates] = useState<StatesType>({
        active: "neutral",
        open: "neutral"
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