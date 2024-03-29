
import { getZones } from "@/api/pharmaciesApis"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useQuery } from "@tanstack/react-query"
import React from "react"


interface ZoneSelectInputProps {
    selectFn: (zone: string) => void
    initialValue?: string,
    placeholder?: string,
    className?: string
}


const ZoneSelectInput: React.FC<ZoneSelectInputProps> = ({ selectFn, initialValue, placeholder, className }) => {

    const { isLoading, data } = useQuery({
        queryKey: ['get-zones'],
        queryFn: () => getZones()
    })


    return (
        <Select

            disabled={isLoading}
            defaultValue={initialValue ? initialValue : undefined}

            onValueChange={(value) => {
                if (value === "*") {
                    return selectFn("")
                }
                return selectFn(value)
            }}
        >
            <SelectTrigger
                className={`w-full md:w-64 ${className}`}
            >
                <SelectValue placeholder={`${placeholder || "Pick a zone"}`}
                />

            </SelectTrigger>
            <SelectContent
                className="h-64 w-80 md:w-full" >
                <SelectItem
                    key={"g1"}
                    value={"*"}
                    className="h-12"
                >
                    {"Toutes les zones"}
                </SelectItem>
                {
                    data?.data.map((zone, idx) => (
                        <SelectItem
                            key={idx}
                            value={zone}
                            className="h-12"
                        >
                            {zone}
                        </SelectItem>
                    ))
                }

            </SelectContent>

        </Select>

    )
}

export default ZoneSelectInput