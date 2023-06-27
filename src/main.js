import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import Swiper from "@/components/Swiper";
import "swiper/css/swiper.min.css";

import TypeNav from './components/TypeNav'
import "@/mock";

Vue.config.productionTip = false

Vue.component("TypeNav",TypeNav)
Vue.component("Swiper",Swiper)
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
