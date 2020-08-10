import Hello from "./src/hello";

Hello.install = function(Vue) {
  Vue.component(Hello.name, Hello);
};

export default Hello;
