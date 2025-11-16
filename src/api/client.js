import axios from "axios";
import { AUTH_LOGOUT_EVENT } from "../constants/auth.js";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api/v1",
  withCredentials: true,
});

let isRefreshing = false;
const pendingRequests = [];

const dispatchAuthLogout = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(AUTH_LOGOUT_EVENT));
  }
};

const processQueue = (error) => {
  while (pendingRequests.length > 0) {
    const { resolve, reject } = pendingRequests.shift();
    if (error) {
      reject(error);
    } else {
      resolve();
    }
  }
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if (!originalRequest || originalRequest.skipAuthRefresh || status !== 401) {
      return Promise.reject(error);
    }

    if (originalRequest._retry) {
      dispatchAuthLogout();
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingRequests.push({ resolve, reject });
      }).then(() => apiClient(originalRequest));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      await apiClient.post("/user/refresh", null, { skipAuthRefresh: true });
      processQueue();
      return apiClient(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError);
      dispatchAuthLogout();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default apiClient;
