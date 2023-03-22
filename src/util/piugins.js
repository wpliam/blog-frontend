import {globalMixin} from "@/util/mixin";

export default {
    install(Vue) {
        Vue.mixin(globalMixin)
        // Vue.prototype.$login = Enroll.install
    },
}
