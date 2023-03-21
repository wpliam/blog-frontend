import axios from 'axios'
import Vue from 'vue'
import Login from '@/components/Account'
import store from "@/store";
import {Message} from "element-ui";

const service = axios.create({
    baseURL: store.state.requestURL,
    timeout: 5000
})

service.interceptors.request.use(
    config => {
        const token = "";
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    error => {
        console.log("request error")
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {
        const code = response.data.code || 0
        const msg = response.data.msg
        if (code === 401) {
            const LoginBox = Vue.extend(Login)
            let instance = new LoginBox().$mount()
            instance.withName("Login")
            document.body.appendChild(instance.$el)
            return Promise.reject("无效的会话,或者会话已过期,请登录.")
        } else if (code === 500) {
            Message({
                message: msg,
                type: "error"
            })
            return Promise.reject(new Error(msg))
        } else if (code !== 0) {
            Message({
                message: msg,
                type: "error"
            })
            return Promise.reject(new Error(msg))
        }
        return response.data.data
    },
    error => {
        return Promise.reject(error)
    }
)

export default service