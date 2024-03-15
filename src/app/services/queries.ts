import { useQuery } from "@tanstack/react-query"
import exp from "constants"
import { getSessionStatus, getSharelistSongs, getSpotifyTopTracks, getUserInfo } from "~/app/services/api"

export const useUserInfo = () => {
    return useQuery({
        queryKey: ["userInfo"],
        queryFn: getUserInfo,
        refetchOnWindowFocus: false
    })
}

export const useSpotifyTopTracks = () => {
    return useQuery({
        queryKey: ["spotifyTopTracks"],
        queryFn: getSpotifyTopTracks,
        refetchOnWindowFocus: false
    })
}

export const useSharelistSongs = () => {
    return useQuery({
        queryKey: ["sharelistSongs"],
        queryFn: getSharelistSongs,
        refetchOnWindowFocus: false
    })
}

export const useSessionStatus = () => {
    return useQuery({
        queryKey: ["sessionStatus"],
        queryFn: getSessionStatus,
        refetchOnWindowFocus: false
    })
}