import axios from "axios";
import { getCookie } from "../utils/functions";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_LINK;


axios.interceptors.request.use(request => {
    const accessToken = getCookie("token");
    if (accessToken) {
        request.headers['Authorization'] = 'Bearer ' + accessToken;
    }
    return request;
})

axios.interceptors.response.use((response) => {
    if (response.data.accessToken) {
        document.cookie = `token=${response.data.accessToken};`;
    }
    return response;
})

export default axios;