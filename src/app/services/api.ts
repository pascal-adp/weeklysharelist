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
    console.log(data)
    return await api.post<any, AxiosResponse<any, any>, SharelistSong>("/sharelist/addSong", {
        ...data
    });
}