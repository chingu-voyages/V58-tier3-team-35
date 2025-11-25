import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": import.meta.env.VITE_API_KEY,
  },
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
