import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import Swiper from "@/components/Swiper";
import Pagination from "@/components/Pagination";
import "swiper/css/swiper.min.css";

import TypeNav from './components/TypeNav'
import "@/mock";

Vue.config.productionTip = false

Vue.component("TypeNav",TypeNav)
Vue.component("Swiper",Swiper)
Vue.component("Pagination",Pagination)
new Vue({
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus=this
  },
  router
}).$mount('#app')
