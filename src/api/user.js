import request from "@/util/request";
import axios from "axios";
import store from "@/store";

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

export function staticUserInfo(uid) {
    return request({
        url: `/api/static_user_info/${uid}`,
        method: "get"
    })
}

export function getUserInfo(uid) {
    return request({
        url: `/api/get_user_info/${uid}`,
        method: "get"
    })
}

export function refreshToken(uid, token) {
    return axios.post(store.state.requestURL + "/api/refresh_token", {uid: uid, token: token})
}