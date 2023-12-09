import axios from "../interceptors/interceptors";
export async function getUser() {
    const user = axios.get("/user/getUser")
    return user;
}

export async function updateUser(userData) {
    const updatedUser = axios.post("/user/update", userData);
    return updatedUser;
}