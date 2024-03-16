import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addSongToSharelist, deleteSongFromSharelist } from "~/app/services/api"
import { type SharelistSong } from "~/app/types/sharelist"

export const useAddSongToSharelist = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["addSongToSharelist"],
    mutationFn: (data: SharelistSong) => addSongToSharelist(data),
    onMutate: async (data) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['sharelistSongs'] })

      // Snapshot the previous value
      const previousSharelistSongs = queryClient.getQueryData(['sharelistSongs'])

      queryClient.setQueryData(['sharelistSongs'], (prevSongs: SharelistSong[] | undefined) => {
        return prevSongs ? [...prevSongs, data] : [data]
      })

      return { previousSharelistSongs }
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(['sharelistSongs'], context?.previousSharelistSongs)
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['sharelistSongs'] })
    },
  })
}

export const useDeleteSongFromSharelist = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["deleteSongFromSharelist"],
    mutationFn: (spotifyTrackId: string) => deleteSongFromSharelist(spotifyTrackId),
    onMutate: async (spotifyTrackId) => {
      await queryClient.cancelQueries({ queryKey: ['sharelistSongs'] })

      const previousSharelistSongs = queryClient.getQueryData(['sharelistSongs'])

      queryClient.setQueryData(['sharelistSongs'], (prevSongs: SharelistSong[] | undefined) => {
        return prevSongs ? prevSongs.filter((song) => song.spotifyTrackId !== spotifyTrackId) : prevSongs
      })

      return { previousSharelistSongs }
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(['sharelistSongs'], context?.previousSharelistSongs)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['sharelistSongs'] })
    },
  })
}