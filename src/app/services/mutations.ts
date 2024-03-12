import { useMutation } from "@tanstack/react-query"
import { addSongToSharelist } from "~/app/services/api"
import { type SharelistSong } from "~/app/types/sharelist"

export const useAddSongToSharelist = () => {
    return useMutation({
        mutationKey: ["addSongToSharelist"],
        mutationFn: (data: SharelistSong) => addSongToSharelist(data)
    })
}