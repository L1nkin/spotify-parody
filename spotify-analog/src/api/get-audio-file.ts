import axios from "axios";
import { axiosInstance } from "./config";

type GetAudioRequest = {
  search: string;
};

type GetAudioResponse = {
  link: string;
};

export const getAudioFile = async ({ search }: GetAudioRequest) => {
  const data = await axiosInstance.get<{ id: string }>(`/track`, {
    params: { search },
  });

  const audioData = await axios.get<GetAudioResponse>(
    "https://youtube-mp36.p.rapidapi.com/dl",
    {
      params: {
        id: data.data.id,
      },
      headers: {
        "x-rapidapi-key": "0ca0e1d8bdmsh19b12a0e32d2d85p1bb22djsn248af8f613d6",
        "x-rapidapi-host": "youtube-mp36.p.rapidapi.com",
      },
    }
  );

  return audioData.data;
};
