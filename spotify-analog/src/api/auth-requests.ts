import { axiosInstance } from "./config";

type RegisterTypeRequest = {
  nickname?: string;
  username: string;
  password: string;
};

type RegisterTypeResponse = {
  token: string;
  expiresIn: number;
};

export const register = async ({
  username,
  password,
  nickname,
}: RegisterTypeRequest) => {
  const data = await axiosInstance.post<RegisterTypeResponse>("/auth/signup", {
    username,
    password,
    nickname,
  });

  return data.data;
};

export const login = async ({ username, password }: RegisterTypeRequest) => {
  const data = await axiosInstance.post<RegisterTypeResponse>("/auth/login", {
    username,
    password,
  });

  return data.data;
};
