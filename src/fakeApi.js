export const LoginApi = (username, password) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            if (username === "phucdinh" && password === "phucdinh") {                
                res({
                    success: true
                })
            } else {
                rej({
                    success: false
                })
            }
        }, 500)
    })
}