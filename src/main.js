import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "@/store";
import "swiper/css/swiper.min.css";
import "@/mock";

import elementUI from "@/main/elementUI";
import lazy from "@/main/lazy";
import validate from "@/main/validate";
import components from "@/main/components";

Vue.use(elementUI);
Vue.use(lazy);
Vue.use(validate);
Vue.use(components);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  router,
  store,
}).$mount("#app");
