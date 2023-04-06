import axios from 'axios'
import Vue from 'vue'
import Enroll from '@/components/Enroll'
import store from "@/store";
import md5 from 'js-md5'
import {getToken, localUserInfo, removeToken, removeUserInfo, setToken} from "@/util/storage";
import {refreshToken} from "@/api/user";

const request = axios.create({
    baseURL: store.state.requestURL,
    timeout: 5000
})

const errorHandler = async (error) => {
    console.log("errorHandler error", error)
    if (error.response.status === 401) {
        let token = getToken()
        let userInfo = localUserInfo()
        if (token) {
            const res = await refreshToken(userInfo.id, token)
            if (res && res.data && res.data.data && res.data.code === 0) {
                setToken(res.data.data.token)
                console.log("刷新token成功")
                error.config.headers.Authorization = `Bearer ${res.data.data.token}`
                return request(error.config)
            }
        }
        const EnrollBox = Vue.extend(Enroll)
        let instance = new EnrollBox().$mount()
        instance.withName("Login")
        document.body.appendChild(instance.$el)
        removeToken()
        removeUserInfo()
    }
    return Promise.reject(error)
}

request.interceptors.request.use(
    config => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        let appid = "appid"
        let sKey = "key"
        let timestamp = new Date().getTime()
        let sign = md5(appid + timestamp + sKey)
        if (config.method === "get" || config.method === "post") {
            config.params = Object.assign({}, config.params, {appid, timestamp, sign})
        }
        return config
    }, errorHandler
)

request.interceptors.response.use(
    async response => {
        const code = response.data.code || 0
        const msg = response.data.msg
        return response.data
    }, errorHandler
)

export default request

export {
    request as axios
}