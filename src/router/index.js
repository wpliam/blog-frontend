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
    },
    {
        path: '/writeArticle',
        name: 'WriteArticle',
        meta: {
            title: "写文章"
        },
        component: () => import('@/page/WriteArticle')
    },
    {
        path: '/archive',
        name: 'Archive',
        meta: {
            title: "归档"
        },
        component: () => import('@/page/Archive')
    },
    {
        path: '/searchResult',
        name: 'SearchResult',
        meta: {
            title: "搜索"
        },
        component: () => import('@/page/SearchResult')
    },
    {
        path: '/userCenter',
        name: 'UserCenter',
        meta: {
            title: "用户中心"
        },
        component: () => import('@/page/UserCenter')
    },
    {
        path: '/classResult',
        name: 'ClassResult',
        meta: {
            title: ""
        },
        component: () => import('@/page/ClassResult')
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