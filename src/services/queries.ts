import { useQuery } from "@tanstack/react-query"
import { getAllFriends, getSessionStatus, getSharelistSongs, getSpotifyTopTracks, getSpotiyTrackSearch, getUserInfo, shareFriend } from "~/services/api"

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

export const useGetAllFriends = () => {
    return useQuery({
        queryKey: ["getAllFriends"],
        queryFn: () => getAllFriends(),
        refetchOnWindowFocus: false
    })
};

export const useShareFriend = () => {
    return useQuery({
        queryKey: ["shareFriend"],
        queryFn: () => shareFriend(),
        refetchOnWindowFocus: false,
        enabled: false
    })
};