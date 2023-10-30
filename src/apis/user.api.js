import axios from "../interceptors/interceptors";
export async function getUser() {
    const user = axios.get("/user/getUser")
    return user;
}