import Vue from 'vue'
import App from './App.vue'
import router from "@/router"
import TypeNav from "@/components/TypeNav"
import Swiper from "@/components/Swiper"
import "swiper/css/swiper.min.css";

import "@/mock";


// 全局注册公共组件
Vue.component("TypeNav",TypeNav)
Vue.component("Swiper",Swiper)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
