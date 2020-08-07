import { hello } from "./assets/js/promise";
import("./assets/css/app.css");
import ElementUI from "element-ui";
import App from "./App.vue";
import Vue from "vue";
import router from "./router";

hello().then((res) => {
  console.log(res);
});

Vue.use(ElementUI);
Vue.use(router);
const root = document.createElement("div");
document.body.appendChild(root);

new Vue({
  // 注入到根实例中
  render: (h) => h(App),
  router,
}).$mount(root);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js");
  });
}
