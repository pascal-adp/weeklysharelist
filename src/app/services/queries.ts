import { useQuery } from "@tanstack/react-query"
import { getSessionStatus, getSharelistSongs, getSpotifyTopTracks, getSpotiyTrackSearch, getUserInfo } from "~/app/services/api"

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

export const useSpotifyTrackSearch = (query: string) => {
    return useQuery({
        queryKey: ["spotifyTrackSearch", query],
        queryFn: () => getSpotiyTrackSearch(query),
        refetchOnWindowFocus: false
    })
}