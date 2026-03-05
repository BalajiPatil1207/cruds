import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Authorization": `Bearer YOUR_TOKEN`,
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
});

export default api;