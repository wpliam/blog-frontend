import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        baseURL: "http://localhost:8080",  // 前端请求地址
        requestURL: "http://localhost:8888", // 后台请求地址
    },
    getters: {},
    mutations: {},
    actions: {},
    modules: {}
})
