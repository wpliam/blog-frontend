import router from "@/router";
import store from "@/store";
import Enroll from "@/components/Enroll"
import Vue from "vue";
import {isLogin} from "@/util/storage";

export const globalMixin = {
    data() {
        return {
            hasLogin: isLogin()
        }
    },
    methods: {
        // 读取文章
        readArticle(article) {
            let route = this.$router.resolve({
                name: "ReadArticle",
                query: {
                    articleID: article.id,
                    userID: article.userID
                }
            })
            let target = "_blank"
            if (this.$route.name === "ReadArticle") {
                target = "_self"
            }
            window.open(route.href, target)
        },
        // 写文章
        writeArticle() {
            if (this.$route.name === "WriteArticle") {
                return
            }
            let route = this.$router.resolve({
                name: "WriteArticle",
            })
            window.open(route.href, "_blank")
        },
        // 用户中心
        userCenter(role = 0, uid = 0) {
            let route = this.$router.resolve({
                name: "UserCenter",
                query: {
                    role: role,
                    uid: uid
                }
            })
            let target = "_blank"
            if (this.$route.name === "UserCenter") {
                target = "_self"
            }
            window.open(route.href, target)
        },
        // 刷新当前路由
        refreshCurrRoute() {
            let url = store.state.baseURL + router.currentRoute.fullPath
            window.open(url, "_self")
        },
        // 去登录或注册
        openLogin() {
            const EnrollBox = Vue.extend(Enroll)
            let instance = new EnrollBox().$mount()
            instance.withName("Login")
            document.body.appendChild(instance.$el)
        },
        // 随机颜色
        randomColor() {
            let color = "rgba("
            for (let i = 0; i < 3; i++) {
                color += Math.random() * 256 + ","
            }
            let alpha = (Math.random() * 10 / 10).toFixed(1)
            alpha = alpha === "0.0" ? "0.8" : alpha
            color += alpha + ")"
            return color
        }
    }
}