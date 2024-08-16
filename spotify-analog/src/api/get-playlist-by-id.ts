import { axiosInstance } from "./config";
import { TrackType } from "./types";

export type PlaylistResponse = {
  name: string;
  imageUrl: string;
  description?: string;
  type: string;
  tracks: TrackType[];
};

export const getPlaylistById = async (id: string) => {
  const data = await axiosInstance.get<PlaylistResponse>(`/playlist/${id}`);

  return data.data;
};
