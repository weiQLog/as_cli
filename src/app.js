import 'src/assets/css/app.scss'
import ElementUI from 'element-ui'
import App from 'src/App.vue'
import Vue from 'vue'
import router from './router'
import Vuex from 'vuex'
import examplePlugins from './plugins/examplePlugins/examplePlugins'
import popup from './plugins/popup/popup'

if (process.env.NODE_ENV === 'development') {
    import ('../src/assets/mock')
}

Vue.use(ElementUI)
Vue.use(router)
Vue.use(Vuex)
Vue.use(examplePlugins)
Vue.use(popup)
const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
    // 注入到根实例中
    render: (h) => h(App),
    router,
}).$mount(root)

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
    })
}