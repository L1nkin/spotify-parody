import { axiosInstance } from "./config";
import { TrackType } from "./types";

export type AlbumResponse = {
  name: string;
  imageUrl: string;
  description?: string;
  type: string;
  tracks: TrackType[];
};

export const getAlbumById = async (id: string) => {
  const data = await axiosInstance.get<AlbumResponse>(`/album/${id}`);

  return data.data;
};
