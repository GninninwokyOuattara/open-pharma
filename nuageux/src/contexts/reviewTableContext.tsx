import { PharmacyBaseData } from "@/types/dataTypes";
import { Table } from "@tanstack/react-table";
import { createContext, useContext, useRef, useState } from "react";



interface IReviewTableContext {
    tableRef?: React.MutableRefObject<Table<any> | null>,
    globalCheckButtonMode: "Check All" | "Uncheck All",
    setGlobalCheckButtonMode: (value: "Check All" | "Uncheck All") => void,
    selectedPharmaciesLength: number,
    setSelectedPharmaciesLength: (value: number) => void


}

const ReviewTableContext = createContext<IReviewTableContext>({

    // tableRef: useRef(null)
    globalCheckButtonMode: "Check All",
    setGlobalCheckButtonMode: () => { },
    selectedPharmaciesLength: 0,
    setSelectedPharmaciesLength: () => { }
})

export const ReviewTableProvider: React.FC<any> = ({ children }) => {

    const tableRef = useRef<Table<PharmacyBaseData> | null>(null)
    const [globalCheckButtonMode, setGlobalCheckButtonMode] = useState<"Check All" | "Uncheck All">("Check All")
    const [selectedPharmaciesLength, setSelectedPharmaciesLength] = useState(0)

    return (
        <ReviewTableContext.Provider value={{
            tableRef,
            globalCheckButtonMode,
            setGlobalCheckButtonMode,
            selectedPharmaciesLength,
            setSelectedPharmaciesLength
        }}>
            {children}
        </ReviewTableContext.Provider>
    )
}


export const useReviewTable = () => useContext(ReviewTableContext)
