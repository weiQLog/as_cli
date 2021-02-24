import loading from './loading.vue'

const elementContains = (parent, child) =>
  parent !== child && parent.contains(child)

function install(Vue, options) {
  const LoadingBox = Vue.extend(loading)
  let instance = {}

  Vue.prototype.$showLoading = function() {
    instance = new LoadingBox({
      data() {
        return {}
      },
      methods: {
        cancel() {
          if (elementContains(document.body, instance.$el)) {
            document.body.removeChild(instance.$el)
          }
        },
      },
    }).$mount()
    console.log(
      elementContains(document.body, document.getElementById(instance.$el.id))
    )
    if (
      !elementContains(document.body, document.getElementById(instance.$el.id))
    ) {
      console.log('有')
      document.body.appendChild(instance.$el)
      Vue.nextTick(() => {
        instance.show = true
      })
      setTimeout(() => {
        const elementContains = (parent, child) =>
          parent !== child && parent.contains(child)
        if (elementContains(document.body, instance.$el)) {
          document.body.removeChild(instance.$el)
        }
      }, 6000)
    } else {
      document.body.removeChild(document.getElementById(instance.$el.id))
      Vue.prototype.$showLoading()
    }
  }

  Vue.prototype.$hideLoading = function() {
    if (
      elementContains(document.body, document.getElementById(instance.$el.id))
    ) {
      document.body.removeChild(document.getElementById(instance.$el.id))
    }
  }
}

export default {
  install,
}
