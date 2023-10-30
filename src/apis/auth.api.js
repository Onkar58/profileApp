import axios from '../interceptors/interceptors';

export async function addUser(data) {
    const add = await axios.post('/auth/signUpUser', data)
    return add;
}
export async function loginUser(data) {
    const add = await axios.post('/auth/loginUser', data)
    return add;
}