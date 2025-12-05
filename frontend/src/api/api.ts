import axios from "axios";

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token dynamically on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");

  config.headers = config.headers || {};

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    config.headers["x-api-key"] = import.meta.env.VITE_API_KEY;
  }

  return config;
});

// Response handler + refresh retry logic
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    /// It api returns 401, we store the initial request and line up its retrial
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // if refresh already in progress → queue request until done
      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribeTokenRefresh((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/refresh`,
          { withCredentials: true }
        );

        const newToken = res.data.accessToken;
        localStorage.setItem("authToken", newToken);

        isRefreshing = false;
        onRefreshed(newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshErr) {
        isRefreshing = false;
        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/auth"; // force login
        return Promise.reject(refreshErr);
      }
    }

    /** Standard error formatting */
    let message = "Something went wrong.";
    if (error.response) {
      message =
        error.response.data?.message ||
        error.response.data?.error ||
        `Request failed (${error.response.status})`;
    } else if (error.request) {
      message = "Server did not respond. Please try again.";
    } else {
      message = error.message;
    }

    const customError: any = new Error(message);
    customError.response = error.response;
    return Promise.reject(customError);
  }
);

export default api;
