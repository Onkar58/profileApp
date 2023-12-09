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

export function toBase64 (file){
    if (!file) return
    if (file?.size > 1024 * 256){
        alert("File size should be less than 256KB")
        return
    }
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }