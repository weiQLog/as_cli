import hello from './hello.vue'

// 需要暴露一个install 方法
function install(Vue, options) {
  // 注册全局组件
  Vue.component(hello.name, hello)
  // 注册全局属性
  Vue.prototype.$test = '全局属性'
  Vue.prototype.$alert = () => {
    alert(Vue.prototype.$test)
  }
}

export default {
  install,
}
