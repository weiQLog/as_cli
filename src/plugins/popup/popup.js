import popup from './popup.vue'

function install(Vue, options) {
  const PopupBox = Vue.extend(popup)
  let instance = {}

  Vue.prototype.$popup = function(data) {
    instance = new PopupBox({
      data,
    }).$mount()
    console.log(instance.$el)
    document.body.appendChild(instance.$el)
    Vue.nextTick(() => {
      instance.show = true
    })
  }

  Vue.prototype.$popupClose = function() {
    document.body.removeChild(instance.$el)
  }
}
export default {
  install,
}
