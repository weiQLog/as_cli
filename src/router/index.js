import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "src/components/HelloWorld";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/index",
      name: "HelloWorld",
      component: HelloWorld,
    },
  ],
});
