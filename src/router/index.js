import Vue from 'vue'
import Router from 'vue-router'
import index from 'components/index/index'
import login from 'components/Login/Login.vue'

Vue.use(Router)

let router = new Router({
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

router.beforeEach((to, from, next) => {
  //beforeEach是router的钩子函数，在进入路由前执行
  if (to.meta.title) {
    //判断是否有标题
    document.title = to.meta.title
  }
  console.log('前置守卫', to)
  next()
})

export default router
