import { axiosInstance } from "../config";
import { PlaylistResponse } from "../get-playlist-by-id";

export type TGetPlaylistDetailsRequest = {
  id: string;
};

export type TGetPlaylistDetailsResponse = PlaylistResponse;

export const getPlaylistDetails = async (
  params: TGetPlaylistDetailsRequest
): Promise<TGetPlaylistDetailsResponse> => {
  const request = await axiosInstance.get(`/myPlaylists/${params.id}`);

  return request.data;
};
