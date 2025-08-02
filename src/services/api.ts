import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.EXPO_PUBLIC_API_URL ||
    /*"http://192.168.4.5:3333/"*/ "https://api.synchroone.com/",
    // "http://192.168.5.53:3333/",
});

export default api;
