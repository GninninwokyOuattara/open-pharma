import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

import { IconType } from "react-icons";


interface IReviewActionButtonProps {
    icon: IconType,
    pharmacyName: string,
    acceptFunction: () => void
    rejectFunction: () => void
}


const ReviewActionButton: React.FC<IReviewActionButtonProps> = ({ icon: Icon, pharmacyName, acceptFunction, rejectFunction }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div>

                    <Icon
                        className={`cursor-pointer hover:text-appOrange`}
                        size={15}
                    // onClick={onClick}

                    />
                </div>
            </DialogTrigger>
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle className="text-appOrange">{pharmacyName} </DialogTitle>
                    <DialogDescription>Should this pharmacy be accepted or rejected ?</DialogDescription>
                    <DialogDescription><span className="text-appOrange">Accept</span> : Make it visible to users</DialogDescription>
                    <DialogDescription><span className="text-appOrange">Reject</span> : Users won't see this pharmacy</DialogDescription>

                </DialogHeader>

                <DialogFooter>
                    <Button
                        type="submit"
                        onClick={acceptFunction}
                        className="hover:bg-appOrange"
                    >

                        Accept

                    </Button>
                    <div className="mt-4"></div>
                    <Button
                        type="submit"
                        onClick={rejectFunction}
                        className="hover:bg-appOrange"

                    >
                        Reject
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ReviewActionButton