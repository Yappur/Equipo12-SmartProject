import axios from "axios";

const obtenerToken = () => {
  return sessionStorage.getItem("token");
};

const axiosConfig = axios.create({
  // baseURL: "", // Backend URL
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosConfig.interceptors.request.use(
  (config) => {
    const token = obtenerToken();

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosConfig;
