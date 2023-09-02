import { createContext, useContext, useEffect, useRef, useState } from "react";


interface IWindowWidth {

    sm: boolean,
    md: boolean,
    lg: boolean,
    xl: boolean

}

const WindowWidthContext = createContext<IWindowWidth>({

    sm: true,
    md: false,
    lg: false,
    xl: false

})

const SMALL_WIDTH_BREAKPOINT = 648
const MEDIUM_WIDTH_BREAKPOINT = 768
const LARGE_WIDTH_BREAKPOINT = 1024
const XL_WIDTH_BREAKPOINT = 1280

export const WindowWidthProvider: React.FC<any> = ({ children }) => {

    // const [windowWidth, setWindowWidth] = useState(648)
    const [windowWidth, setWindowWidth] = useState({
        sm: true,
        md: false,
        lg: false,
        xl: false

    })
    const windowWidthRef = useRef<any>()
    windowWidthRef.current = windowWidth

    const getBreakpointCategory = (width: number) => {

        if (width < SMALL_WIDTH_BREAKPOINT) {
            return "sm"
        } else if (width < MEDIUM_WIDTH_BREAKPOINT) {
            return "md"
        } else if (width < LARGE_WIDTH_BREAKPOINT) {
            return "lg"
        } else if (width < XL_WIDTH_BREAKPOINT) {
            return "xl"
        } else {
            return "xl"
        }
    }

    const resizeHandler = () => {


        if (!windowWidthRef.current[getBreakpointCategory(window.innerWidth)]) {

            if (window.innerWidth < SMALL_WIDTH_BREAKPOINT) {
                setWindowWidth({ sm: true, md: false, lg: false, xl: false })
            } else if (window.innerWidth < MEDIUM_WIDTH_BREAKPOINT) {
                setWindowWidth({ sm: false, md: true, lg: false, xl: false })
            } else if (window.innerWidth < LARGE_WIDTH_BREAKPOINT) {
                setWindowWidth({ sm: false, md: false, lg: true, xl: false })
            } else if (window.innerWidth < XL_WIDTH_BREAKPOINT) {
                setWindowWidth({ sm: false, md: false, lg: false, xl: true })
            } else {
                setWindowWidth({ sm: true, md: false, lg: false, xl: false })
            }

        } else {
            return
        }


    }



    useEffect(() => {
        window.addEventListener("resize", resizeHandler)

        return () => {
            window.removeEventListener("resize", resizeHandler)
        }
    }, [])

    useEffect(() => {
        resizeHandler();
    }, [])




    return (
        <WindowWidthContext.Provider value={{
            ...windowWidth
        }}>
            {children}
        </WindowWidthContext.Provider>
    )
}


export const useWindowWidth = () => useContext(WindowWidthContext)
