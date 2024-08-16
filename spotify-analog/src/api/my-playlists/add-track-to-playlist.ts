import { axiosInstance } from "../config"
import { PlaylistResponse } from "../get-playlist-by-id"

export type TAddTrackToPlaylistRequest = {
    playlistId: string
    songId: string
}

export type TAddTrackToPlaylistResponse = any

export const addTrackToPlaylist = async (body: TAddTrackToPlaylistRequest): Promise<TAddTrackToPlaylistResponse> => {
    const request = await axiosInstance.put('/myPlaylists', {
        ...body
    })

    return request.data
}