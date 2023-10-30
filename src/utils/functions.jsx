export function getCookie(name) {
    const value = document.cookie
    const cookies = value.split(';')
    for (let index in cookies) {
        const [key, val] = cookies[index].split('=')
        if (key === name) {
            return val
        }
    }
}
