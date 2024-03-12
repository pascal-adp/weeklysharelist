import { useQuery } from "@tanstack/react-query"
import { getUserInfo } from "~/app/services/api"

export const useUserInfo = () => {
    return useQuery({
        queryKey: ["userInfo"],
        queryFn: getUserInfo,
        refetchOnWindowFocus: false
    })
}