import { apiCache } from "./config";
import { TrackType } from "./types";

type TItem = {
  id: string;
  name: string;
  imageUrl: string;
  description?: string;
};

export type SearchTypeResponse = {
  playlists: TItem[];
  albums: TItem[];
  tracks: TrackType[];
};

export const searchPlaylists = async (search: string) => {
  const data = await apiCache.get<SearchTypeResponse>("/search", {
    params: {
      search,
    },
  });
  return data.data;
};
