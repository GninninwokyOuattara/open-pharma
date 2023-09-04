import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { usePharmacyDialog } from "@/contexts/pharmacyDialogContext";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle
} from "@/components/ui/sheet";
import { useWindowWidth } from "@/contexts/windowWidthContext";
import PharmacyForm from "./forms/pharmacieForm";

const PharmacyModalRenderer = () => {

    const { isLoading, open, setOpen, pharmacyDetails } = usePharmacyDialog()
    const { sm } = useWindowWidth()

    return (
        <>

            {

                !sm &&
                <>
                    <Dialog open={open} onOpenChange={setOpen}>
                        {/* <DialogTrigger>Open</DialogTrigger> */}
                        <DialogContent className="max-h-[90%] overflow-scroll">
                            <DialogHeader>
                                <DialogTitle className="text-appOrange" >{pharmacyDetails?.name}</DialogTitle>
                                {/* <DialogDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
        </DialogDescription> */}
                            </DialogHeader>
                            {
                                isLoading && <div>Loading</div>
                            }

                            {
                                pharmacyDetails && <PharmacyForm pharmacy={pharmacyDetails} />
                            }

                        </DialogContent>
                    </Dialog>
                </>
            }
            {sm &&
                <>
                    <Sheet open={open} onOpenChange={setOpen}>
                        {/* <SheetTrigger>Open</SheetTrigger> */}
                        <SheetContent side={"bottom"} className="h-[90%] overflow-scroll">
                            <SheetHeader>
                                <SheetTitle className="text-appOrange">{pharmacyDetails?.name}</SheetTitle>
                                <SheetDescription>
                                </SheetDescription>

                            </SheetHeader>
                            <PharmacyForm pharmacy={pharmacyDetails} />

                        </SheetContent>
                    </Sheet>
                </>
            }

        </>
    )
}

export default PharmacyModalRenderer