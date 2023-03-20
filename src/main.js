import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import scroll from 'vue-seamless-scroll'

import * as filters from '@/util/filters'
import plugins from '@/util/piugins'

import '@/assets/css/common.less'
import '@/assets/css/media.less'
import '@/assets/icons'

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

Vue.config.productionTip = false
Vue.use(ElementUi)
Vue.use(VueAwesomeSwiper)
Vue.use(mavonEditor)
Vue.use(plugins)
Vue.use(scroll)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
