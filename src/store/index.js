import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        baseURL: "http://localhost:8080",  // 前端请求地址
        requestURL: "http://localhost:8888", // 后台请求地址
        uploadURL: "http://localhost:8888/api/upload", // 文件上传地址

        hasFollow: false, // 是否关注
        hasClock: false // 是否签到
    },
    getters: {
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
