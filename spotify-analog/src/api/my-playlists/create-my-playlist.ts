import { axiosInstance } from "../config"

export type TCreateMyPlaylistRequest = {
    name: string
}

export type TCreateMyPlaylistResponse = any

export const createMyPlaylist = async (body: TCreateMyPlaylistRequest): Promise<TCreateMyPlaylistResponse> => {
    const request = await axiosInstance.post('/myPlaylists', {
        name: body.name
    })

    return request.data
}