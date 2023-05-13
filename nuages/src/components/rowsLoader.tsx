import { Skeleton, TableCellProps, Tbody, Td, Tr } from "@chakra-ui/react"
import { PendingReviewPharmacy } from "../types"


export const PendingReviewSkeletonLoader: React.FC<{ firstTenPharmacies: PendingReviewPharmacy[] }> = ({ firstTenPharmacies }) => {

    return (
        <Tbody>
            {firstTenPharmacies.map((p: PendingReviewPharmacy, idx) => {
                return (
                    <Tr key={idx}>
                        <LoadingRowData >{p.name}</LoadingRowData>
                        <LoadingRowData>{p.time_elapsed}</LoadingRowData>
                        {/* <LoadingRowData padding={0} w={0} >
                            <ReviewButton for={"validate"} onClick={() => { }} />
                        </LoadingRowData>
                        <LoadingRowData paddingX={1} w={0} >
                            <ReviewButton for={"validate"} onClick={() => { }} />
                        </LoadingRowData>
                        <LoadingRowData padding={0} paddingRight={2} w={0} >
                            <ReviewButton for={"validate"} onClick={() => { }} />
                        </LoadingRowData> */}
                        <SkeletonLoaadingIcon paddingX={1} w={0} />
                        <SkeletonLoaadingIcon paddingX={1} w={0} />

                        <SkeletonLoaadingIcon padding={0} paddingRight={2} w={0} />
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

            <SkeletonLoaadingIcon paddingX={1} w={0} />
            <SkeletonLoaadingIcon paddingX={1} w={0} />

            <SkeletonLoaadingIcon padding={0} paddingRight={2} w={0} />



        </Tr>
    )
}

const LoadingRowData: React.FC<TableCellProps> = (props) => {

    return (
        <Td
            {...props}
            borderColor={"gray.300"}
        >

            <Skeleton>
                {props.children}
            </Skeleton>

        </Td>
    )
}

const SkeletonLoaadingIcon: React.FC<TableCellProps> = (props) => {

    return <Td {...props} borderColor={"gray.300"}
    >
        <Skeleton
            width={"20px"} height={"20px"}
            bg='green.500'
            color='white'
            fadeDuration={1}
        />
    </Td>

}
