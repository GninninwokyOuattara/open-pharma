import { Skeleton, TableCellProps, Tbody, Td, Tr } from "@chakra-ui/react"
import { palette } from "../colorPalette"
import { PendingReviewPharmacy } from "../types"
import { ReviewButton } from "./actionButtons"


export const PendingReviewSkeletonLoader: React.FC<{ firstTenPharmacies: PendingReviewPharmacy[] }> = ({ firstTenPharmacies }) => {

    return (
        <Tbody>
            {firstTenPharmacies.map((p: PendingReviewPharmacy) => {
                return (
                    <Tr>
                        <LoadingRowData >{p.name}</LoadingRowData>
                        <LoadingRowData>{p.time_elapsed}</LoadingRowData>
                        <LoadingRowData padding={0} w={0} >
                            <ReviewButton for={"validate"} onClick={() => { }} />
                        </LoadingRowData>
                        <LoadingRowData paddingX={1} w={0} >
                            <ReviewButton for={"validate"} onClick={() => { }} />
                        </LoadingRowData>
                        <LoadingRowData padding={0} paddingRight={2} w={0} >
                            <ReviewButton for={"validate"} onClick={() => { }} />
                        </LoadingRowData>
                    </Tr>
                )
            })}
        </Tbody>
    )
}

export const SingleRowSkeletonLoader: React.FC<{ pharmacy: PendingReviewPharmacy }> = ({ pharmacy }) => {
    return (
        <Tr>
            <LoadingRowData >{pharmacy.name}</LoadingRowData>
            <LoadingRowData>{pharmacy.time_elapsed}</LoadingRowData>
            <LoadingRowData padding={0} w={0} >
                <ReviewButton for={"validate"} onClick={() => { }} />
            </LoadingRowData>
            <LoadingRowData paddingX={1} w={0} >
                <ReviewButton for={"validate"} onClick={() => { }} />
            </LoadingRowData>
            <LoadingRowData padding={0} paddingRight={2} w={0} >
                <ReviewButton for={"validate"} onClick={() => { }} />
            </LoadingRowData>
        </Tr>
    )
}

const LoadingRowData: React.FC<TableCellProps> = (props) => {

    return (
        <Td
            {...props}
            borderColor={palette.colorHuntTheme.lightOrange}
        >

            <Skeleton>
                {props.children}
            </Skeleton>

        </Td>
    )
}
