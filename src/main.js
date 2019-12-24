import Vue from "vue";
import App from "./App.vue";
import VueToastr from "@deveodk/vue-toastr";

Vue.config.productionTip = false;

Vue.use(VueToastr, {
  defaultPosition: "toast-top-right",
  defaultTimeout: 5000
});

new Vue({
  render: h => h(App)
}).$mount("#app");
