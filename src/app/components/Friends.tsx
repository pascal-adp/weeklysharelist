"use client"
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "~/app/components/ui/dialog";
import { Separator } from "~/app/components/ui/separator";
import { Button } from "./ui/button";
import { useShareFriend } from "~/app/services/queries";

const createFriendUrl = (uuid: string) => {
    const friendUrl = `${process.env.FRONTEND_URL}/friends/add/${uuid}`; // Replace with the actual URL
    navigator.clipboard.writeText(friendUrl)
        .then(() => {
            console.log('Friend URL copied to clipboard');
        })
        .catch(err => {
            console.error('Could not copy text: ', err);
        });
}

interface FriendsProps {
    dialogOpen: boolean,
    updateDialogOpenState: (dialogOpen: boolean) => void;
}

const Friends: React.FC<FriendsProps> = ({ dialogOpen, updateDialogOpenState }) => {
    const shareFriend = useShareFriend();

    return (
        <Dialog open={dialogOpen} onOpenChange={() => updateDialogOpenState(!dialogOpen)}>
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
                <p>Add friends</p>
                <Button onClick={async () => {
                    const res = await shareFriend.refetch();
                    createFriendUrl(res.data ? res.data.uuid : "")
                }} className="bg-ws-mindaro flex flex-row justify-center">🔗Create a friend URL</Button>
            </DialogContent>
        </Dialog>
    )
}

export default Friends;