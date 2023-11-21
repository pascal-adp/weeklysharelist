import axios from "axios"

export const searchForItem = async ({q, type, limit=5}: SpotifyApi.SearchForItemParameterObject) => {
    const baseUrl = "https://api.spotify.com/v1/search"

    const url = new URL(baseUrl)

    const params = new URLSearchParams({

    })
    
    await axios.get<SpotifyApi.TrackSearchResponse>("https://api.spotify.com/v1/search", {
        
    })
} 