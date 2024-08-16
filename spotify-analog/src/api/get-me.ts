import { axiosInstance } from "./config";

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

export const getMe = async () => {
  const data = await axiosInstance.get<{ nickname: string; username: string }>(
    "/me"
  );
  return data.data;
};
