import axios, { type AxiosResponse } from "axios";
import { type SharelistSong } from "../types/sharelist";

const api = axios.create({
    baseURL: "http://localhost:8000/api/v1",
    withCredentials: true
})

type UserInfo = {
    name: string;
    image: string;
}
export const getUserInfo = async () => {
    return await api.get<UserInfo>("/user/info");
}

export const addSongToSharelist = async (data: SharelistSong) => {
    return await api.post<any, AxiosResponse<any, any>, SharelistSong>("/sharelist/addSong", {
        ...data
    });
}

export const getSpotifyTopTracks = async (): Promise<SpotifyApi.TrackObjectFull[]> => {
    const response = await api.get<any>("/spotify/top/tracks");
    return response.data.items;
}

export const getSharelistSongs = async () => {
    const response = await api.get<SharelistSong[]>("/sharelist/getSongs");
    console.log(response.data)
    return response.data;
}

export const deleteSongFromSharelist = async (spotifyTrackId: string) => {
    const response = await api.delete(`/sharelist/deleteSong/${spotifyTrackId}`);
}

interface Session {
    status: "authenticated" | "unauthenticated";
}
export const getSessionStatus = async () => {
    const response = await api.get<Session>("/session/status");
    return response.data;
}