const userInfoKey = "userInfo"
const authKey = "tokenKey"

export function getToken() {
    return localStorage.getItem(authKey);
}

export function localUserInfo() {
    let userInfo = localStorage.getItem(userInfoKey);
    if (userInfo) {
        return JSON.parse(userInfo)
    }
    return {}
}

export function setToken(token) {
    localStorage.setItem(authKey, token)
}

export function setUserInfo(info) {
    localStorage.setItem(userInfoKey, JSON.stringify(info))
}

export function removeToken() {
    localStorage.removeItem(authKey)
}

export function removeUserInfo() {
    localStorage.removeItem(userInfoKey)
}