import { apiCache } from "./config";

type TItem = {
  id: string;
  name: string;
  imageUrl: string;
  description?: string;
};

export type SuggestionsTypeResponse = {
  playlists: TItem[];
  albums: TItem[];
};

export const getSuggestions = async () => {
  const data = await apiCache.get<SuggestionsTypeResponse>("/suggestions");
  return data.data;
};
