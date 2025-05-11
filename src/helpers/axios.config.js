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
      console.log("Token enviado:", token);
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosConfig.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Si recibimos un 401 (no autorizado) o 403 (prohibido), podría ser un token expirado
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      // Limpiar tokens
      localStorage.removeItem("authToken");
      sessionStorage.removeItem("authToken");

      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosConfig;
