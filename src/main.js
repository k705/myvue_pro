import Vue from 'vue'
import App from './App.vue'
import router from "@/router"
import TypeNav from "@/components/TypeNav"
import Swiper from "@/components/Swiper"
import "@/mock"
import "swiper/css/swiper.min.css";

Vue.component("TypeNav",TypeNav)
Vue.component("Swiper",Swiper)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this
  },
  router
}).$mount('#app')
