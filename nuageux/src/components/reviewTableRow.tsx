import { PharmacyBaseData } from "@/types/datatypes";
import moment from "moment";
import { AiOutlineCheck } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import IconButton from "./buttons/iconButton";
import { Badge } from "./ui/badge";



const ReviewTableRow: React.FC<{ data: PharmacyBaseData }> = ({ data }) => (
    <div className="flex flex-row justify-between">

        <div className="flex flex-col" >
            <p>{data.name}</p>

            {data.zone &&
                <Badge variant={"secondary"} className="text-appOrange w-fit">{data.zone}</Badge>

            }

            <p className="text-appGray font-light">--{moment(data.date_created).startOf("day").fromNow()}</p>

        </div>
        <div className="flex flex-col justify-center gap-4">
            <IconButton icon={AiOutlineCheck}
                hoverColor="red" />
            <IconButton icon={RxCross1}
                hoverColor="red" />
        </div>
    </div>
)

export default ReviewTableRow