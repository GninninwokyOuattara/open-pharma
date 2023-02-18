import { Th, Thead, Tr } from "@chakra-ui/react"
import { palette } from "../colorPalette"


export const PendingReviewPageTableHeaders = () => {
    return (
        <Thead
            backgroundColor={palette.colorHuntTheme.lightOrange}
            fontWeight={"bold"}
            position={"sticky"} top={0} zIndex={1}

        >
            <Tr>
                <Th>Name</Th>
                {/* <Th>Date Added</Th> */}
                <Th>Time Elapsed</Th>
                <Th padding={0} w={0} ></Th> {/* Validate */}
                <Th padding={1} w={0}></Th> {/* Invalidate */}
                <Th padding={1} w={0}></Th> {/* Link to another */}
            </Tr>
        </Thead>
    )
}
