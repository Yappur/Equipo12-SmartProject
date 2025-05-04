import axios from "axios";

const obtenerToken = () => {
  let token = localStorage.getItem("authToken");
  if (!token) {
    token = sessionStorage.getItem("authToken");
  }
  return token;
};

const axiosConfig = axios.create({
  baseURL: "https://backend-foo-talent.onrender.com",
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
