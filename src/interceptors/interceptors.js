import axios from "axios";
import { getCookie } from "../utils/functions";

axios.defaults.baseURL = "http://localhost:8000/api/v1";



axios.interceptors.request.use(request => {
    console.log("Request Interceptor", request);
    const accessToken = getCookie("token");
    console.log("accessToken", accessToken);
    if (accessToken) {
        request.headers['Authorization'] = 'Bearer ' + accessToken;
        console.log(request.headers['Authorization']);
    }
    console.log("Request not setted", request);
    return request;
})

axios.interceptors.response.use((response) => {
    console.log("Response Interceptor", response);
    if (response.data.accessToken) {
        console.log("Setting cookie");
        document.cookie = `token=${response.data.accessToken};`;
        console.log(document.cookie);
    }
    return response;
})

export default axios;