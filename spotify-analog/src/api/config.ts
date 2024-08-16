import axios from "axios";
import { buildWebStorage, setupCache } from "axios-cache-interceptor";

// interface FailedRequests {
//   resolve: (value: AxiosResponse) => void;
//   reject: (value: AxiosError) => void;
//   config: AxiosRequestConfig;
//   error: AxiosError;
// }

export const axiosInstance = axios.create({
  baseURL: "https://3df9-212-132-117-149.ngrok-free.app",
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiCache = setupCache(axiosInstance, {
  ttl: 15 * 60 * 1000, // Time to live for cache (15 minutes),
  storage: buildWebStorage(localStorage, "axios-cache:"),
});

axiosInstance.interceptors.request.use((request) => {
  const accessToken = localStorage.getItem("token");

  if (accessToken) {
    request.headers.Authorization = `Bearer ${JSON.parse(accessToken)}`;
  }

  return request;
});

// let failedRequests: FailedRequests[] = [];
// let isTokenRefreshing = false;

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error: AxiosError) => {
//     const status = error.response?.status;
//     const originalRequestConfig = error.config!;

//     if (status !== 401) {
//       return Promise.reject(error);
//     }

//     if (isTokenRefreshing) {
//       return new Promise((resolve, reject) => {
//         failedRequests.push({
//           resolve,
//           reject,
//           config: originalRequestConfig,
//           error,
//         });
//       });
//     }

//     isTokenRefreshing = true;

//     try {
//       const response = await AuthRequestsApi.refresh({
//         accessToken: JSON.parse(localStorage.getItem(ACCESS_TOKEN_KEY) ?? ""),
//         refreshToken: cookie.get(REFRESH_TOKEN_KEY),
//       });
//       const { accessToken = null, refreshToken = null } = response ?? {};

//       if (!accessToken || !refreshToken) {
//         throw new Error(
//           "Something went wrong while refreshing your access token"
//         );
//       }

//       localStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(accessToken));
//       cookie.set(REFRESH_TOKEN_KEY, refreshToken);

//       failedRequests.forEach(({ resolve, reject, config }) => {
//         axiosInstance(config)
//           .then((response) => resolve(response))
//           .catch((error) => reject(error));
//       });
//     } catch (_error: unknown) {
//       console.error(_error);
//       failedRequests.forEach(({ reject, error }) => reject(error));
//       localStorage.setItem(ACCESS_TOKEN_KEY, "");
//       cookie.remove(REFRESH_TOKEN_KEY);
//       return Promise.reject(error);
//     } finally {
//       failedRequests = [];
//       isTokenRefreshing = false;
//     }

//     return axiosInstance(originalRequestConfig);
//   }
// );
