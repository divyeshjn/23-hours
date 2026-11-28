import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    (
      import.meta.env.PROD
        ? "/api"
        : "http://localhost:5000/api"
    ),

  timeout: 15000,

  withCredentials: true,

  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.response.use(
  response => response.data,

  error => {
    const message =
      error.response?.data?.message ||
      (
        error.code === "ECONNABORTED"
          ? "Request timed out. Please try again."
          : error.response
            ? "Something went wrong."
            : "Unable to connect to the server."
      );

    const apiError = new Error(message);

    apiError.status = error.response?.status;
    apiError.code = error.code;

    const requestUrl = error.config?.url || "";

    if (
      apiError.status === 401 &&
      !requestUrl.startsWith("/auth/")
    ) {
      window.dispatchEvent(
        new Event("23-hours:unauthorized")
      );
    }

    return Promise.reject(apiError);
  }
);

export default api;