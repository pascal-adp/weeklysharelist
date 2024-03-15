import { useMutation } from "@tanstack/react-query"
import { addSongToSharelist, deleteSongFromSharelist } from "~/app/services/api"
import { type SharelistSong } from "~/app/types/sharelist"

export const useAddSongToSharelist = () => {
    return useMutation({
        mutationKey: ["addSongToSharelist"],
        mutationFn: (data: SharelistSong) => addSongToSharelist(data)
    })
}

export const useDeleteSongFromSharelist = () => {
    return useMutation({
        mutationKey: ["deleteSongFromSharelist"],
        mutationFn: (spotifyTrackId: string) => deleteSongFromSharelist(spotifyTrackId)
    })
}