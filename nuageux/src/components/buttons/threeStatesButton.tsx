import { Button } from '@/components/ui/button'
import { StateOptions } from '../pharmaciesPageFilterStateCtrl'


interface ThreeStatesButtonProps {
    state: StateOptions,
    stateCtrlFunc: (value: StateOptions) => void
    title: string,
    color?: "blue" | "green" | "orange"
}
const ThreeStatesButton: React.FC<ThreeStatesButtonProps> = ({ state, stateCtrlFunc, title, color }) => {




    const baseColor = `${color || "blue"}`
    const buttonVariants = {
        neutral: `bg-white hover:bg-white text-${baseColor}-500 hover:text-${baseColor}-600 border-2 border-${baseColor}-500 hover:border-${baseColor}-600`,
        true: `bg-${baseColor}-500 hover:bg-${baseColor}-600`,
        false: "bg-gray-500 hover:bg-gray-600",
    }

    const changeState = () => {
        if (state === "neutral") stateCtrlFunc("true")
        else if (state === "true") stateCtrlFunc("false")
        else if (state === "false") stateCtrlFunc("neutral")
        else stateCtrlFunc("neutral")
    }

    return (

        <Button
            className={`h-6 w-24 ${buttonVariants[state]}`}
            onClick={changeState}
        >{title}</Button>
    )
}

export default ThreeStatesButton