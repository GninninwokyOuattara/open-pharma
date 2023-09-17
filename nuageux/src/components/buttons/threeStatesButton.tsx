import { Button } from '@/components/ui/button'
import { StateOptions } from '../pharmaciesPageFilterStateCtrl'


interface ThreeStatesButtonProps {
    state: StateOptions,
    stateCtrlFunc: (value: StateOptions) => void
    title: string,
    color?: "blue" | "green"
}
const ThreeStatesButton: React.FC<ThreeStatesButtonProps> = ({ state, stateCtrlFunc, title, color = "blue" }) => {

    const bVariants = {
        blue: {
            neutral: `bg-white hover:bg-white text-blue-500 hover:text-blue-600 border-2 border-blue-500 hover:border-blue-600`,
            true: `bg-blue-500 hover:bg-blue-600`,
            false: "bg-gray-500 hover:bg-gray-600",
        },
        green: {
            neutral: `bg-white hover:bg-white text-green-500 hover:text-green-600 border-2 border-green-500 hover:border-green-600`,
            true: `bg-green-500 hover:bg-green-600`,
            false: "bg-gray-500 hover:bg-gray-600",
        }
    }

    const changeState = () => {
        if (state === "neutral") stateCtrlFunc("true")
        else if (state === "true") stateCtrlFunc("false")
        else if (state === "false") stateCtrlFunc("neutral")
        else stateCtrlFunc("neutral")
    }

    return (

        <Button
            className={`h-6 w-24 ${bVariants[color][state]}`}
            onClick={changeState}
        >{title}</Button>
    )
}

export default ThreeStatesButton