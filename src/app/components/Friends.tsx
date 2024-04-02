import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/app/components/ui/dialog";
import { Separator } from "~/app/components/ui/separator";

const Friends: React.FC = () => {
    const [dialogOpen, setDialogOpen] = useState(false);


    return (
        <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen(!dialogOpen)}>
            <DialogTrigger>Open</DialogTrigger>
            <DialogContent className="w-2/3">
                <DialogHeader>
                    <DialogTitle className="text-3xl font-bold tracking-[-0.1em]">
                        Your Friends
                    </DialogTitle>
                    <DialogDescription className="text-md">
                        Add, or remove friends
                    </DialogDescription>
                </DialogHeader>
                <Separator className="my-2 bg-gray-200" />
            </DialogContent>
        </Dialog>
    )
}

export default Friends;