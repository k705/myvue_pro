import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import TypeNav from "@/components/TypeNav";
import Swiper from "@/components/Swiper";
import Pagination from "@/components/Pagination";
import "swiper/css/swiper.min.css";
import "@/mock";
import store from "@/store";

import VueLazyload from "vue-lazyload";
import loading from "@/assets/images/loading.gif";
import VeeValidate from "vee-validate";
import zh_CN from "vee-validate/dist/locale/zh_CN"; 

Vue.use(VeeValidate);

Vue.use(VueLazyload, {
  loading,
});

VeeValidate.Validator.localize("zh_CN", {
  messages: {
    ...zh_CN.messages,
    is: (field) => `${field}必须与密码相同`, 
  },
  attributes: {
    phone: "手机号",
    code: "验证码",
    password: "密码",
    passwordAgain: "确认密码",
    isAgree:"协议"
  },
});

VeeValidate.Validator.extend("agree", {
  validate: (n) => n,
  getMessage: (field) => field + "必须同意",
});

Vue.config.productionTip = false;


Vue.component("TypeNav", TypeNav);
Vue.component("Swiper", Swiper);
Vue.component("Pagination", Pagination);

new Vue({
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  router,
  store,
}).$mount("#app");
