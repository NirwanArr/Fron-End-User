import axios from "axios";

const api = axios.create({
  baseURL:
    "https://backend-production-f9e7.up.railway.app/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
