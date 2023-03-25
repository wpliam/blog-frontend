const authKey = "apple"

export function getToken() {
    let userInfo = localStorage.getItem(authKey);
    if (!userInfo) {
        return ""
    }
    let item = JSON.parse(userInfo);
    return item.token
}

export function localUserInfo() {
    let userInfo = localStorage.getItem(authKey);
    if (userInfo) {
        return JSON.parse(userInfo)
    }
    return {}
}

export function isLogin() {
    return getToken() !== ""
}

export function setUserInfo(info) {
    localStorage.setItem(authKey, JSON.stringify(info))
}

export function removeUserInfo() {
    localStorage.removeItem(authKey)
}