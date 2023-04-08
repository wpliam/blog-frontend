import Vue from 'vue'
import Vuex from 'vuex'
import md5 from "js-md5";
import app from "@/App";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        baseURL: "http://localhost:8080",  // 前端请求地址
        requestURL: "http://localhost:8888", // 后台请求地址

        hasFollow: false, // 是否关注
        hasClock: false // 是否签到
    },
    getters: {
        getUploadURL(state) {
            let appid = "appid"
            let sKey = "key"
            let timestamp = new Date().getTime()
            let sign = md5(appid + timestamp + sKey)
            return `http://localhost:8888/api/upload?appid=${appid}&timestamp=${timestamp}&sign=${sign}`
        },
        getFollow(state) {
            return state.hasFollow
        },
        getClock(state) {
            return state.hasClock
        }
    },
    mutations: {
        setFollow(state, isFollow = false) {
            state.hasFollow = isFollow
        },
        setClock(state, isClock = false) {
            state.hasClock = isClock
        }
    },
    actions: {},
    modules: {}
})
