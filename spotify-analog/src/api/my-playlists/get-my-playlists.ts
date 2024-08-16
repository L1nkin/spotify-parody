import { axiosInstance } from "../config"
import { TMyPlaylist } from "../my-playlists"

export type TGetMyPlaylistsRequest = {}

export type TGetMyPlaylistsResponse = TMyPlaylist[]

export const getMyPlaylists = async (params: TGetMyPlaylistsRequest): Promise<TGetMyPlaylistsResponse> => {
    const request = await axiosInstance.get('/myPlaylists', {
        params
    })

    return request.data
}