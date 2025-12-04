import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    config.headers["x-api-key"] = import.meta.env.VITE_API_KEY;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,

  (error) => {
    let message = "Something went wrong.";

    if (error.response) {
      message =
        error.response.data?.message ||
        error.response.data?.error ||
        `Request failed (${error.response.status})`;
    } else if (error.request) {
      message = "Server did not respond. Please try again.";
    } else {
      message = error.message || "Request error.";
    }

    const customError: any = new Error(message);
    customError.response = error.response;
    return Promise.reject(customError);
  }
);

export default api;
