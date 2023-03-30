import request from "@/util/request";

// 登录
export function login(username, password) {
    return request({
        url: "/api/login",
        method: "post",
        data: {
            username, password
        }
    })
}

// 退出
export function logout() {
    return request({
        url: "/api/logout",
        method: "post"
    })
}

export function refreshToken(token, uid) {
    return request({
        url: "/api/refresh_token",
        date: {
            token, uid
        }
    })
}

export function staticUserInfo(uid) {
    return request({
        url: `/api/static_user_info/${uid}`,
        method: "get"
    })
}