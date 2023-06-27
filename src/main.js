import Vue from 'vue'
import App from './App.vue'
import router from "@/router"

Vue.component("TypeNav",TypeNav)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
