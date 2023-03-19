import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        meta: {
            title: "首页"
        },
        component: () => import('@/page/Home')
    },
    {
        path: '/readArticle',
        name: 'ReadArticle',
        meta: {
            title: "文章详情"
        },
        component: () => import('@/page/ReadArticle')
    }
]

const router = new VueRouter({
    mode: "history",
    routes
})

//全局路由前置守卫
router.beforeEach((to, from, next) => {
    next()
})

//全局路由后置守卫
router.afterEach((to, from) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
})

export default router