import { ofetch } from "ofetch";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const apiClient = ofetch.create({
  baseURL: BASE_URL,
  credentials: "include",
});

export default apiClient;

// import { ofetch, type FetchOptions } from "ofetch";

// // const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// const BASE_URL =
//   process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000/api/v1";
// const REFRESH_PATH = "/auth/refresh-token"; // change to your endpoint

// const baseClient = ofetch.create({
//   baseURL: BASE_URL,
//   credentials: "include",
// });

// // One shared refresh so concurrent 401s don't each hit the endpoint
// let refreshPromise: Promise<void> | null = null;

// function refreshSession() {
//   refreshPromise ??= baseClient(REFRESH_PATH, { method: "POST" })
//     .then(() => undefined)
//     .finally(() => {
//       refreshPromise = null;
//     });
//   return refreshPromise;
// }

// async function apiClient<T = any>(
//   request: string,
//   options?: FetchOptions<"json">,
// ): Promise<T> {
//   try {
//     return await baseClient<T>(request, options);
//   } catch (error: any) {
//     if (error?.response?.status !== 401 || request === REFRESH_PATH)
//       throw error;

//     try {
//       await refreshSession();
//     } catch (refreshError) {
//       if (typeof window !== "undefined") window.location.href = "/login";
//       throw refreshError;
//     }

//     return baseClient<T>(request, options); // retry once
//   }
// }

// export default apiClient;
