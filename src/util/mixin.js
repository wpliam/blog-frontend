import router from "@/router";
import store from "@/store";
import Enroll from "@/components/Enroll"
import Vue from "vue";

export const globalMixin = {
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
        writeArticle() {
            if (this.$route.name === "WriteArticle") {
                return
            }
            let route = this.$router.resolve({
                name: "WriteArticle",
            })
            window.open(route.href, "_blank")
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
        }
    }
}