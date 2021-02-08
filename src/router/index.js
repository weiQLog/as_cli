import Vue from 'vue'
import Router from 'vue-router'
import index from 'components/index/index'
import login from 'components/Login/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      component: index,
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
  ],
})
