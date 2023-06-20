import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes"
import NProgress from "nprogress";
import "nprogress/nprogress.css";

//把路由作为插件进行使用
Vue.use(VueRouter);

//实例化一个路由器对象
const router = new VueRouter({
  routes,
});


// 重写push解决编程式重复导航bug
const oldPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location, complete = () => { }, abort = () => { }) {
  oldPush.call(this, location, complete, abort)
}
const oldReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function (location, complete = () => { }, abort = () => { }) {
  oldReplace.call(this, location, complete, abort)
}


// 路由切换时进度条的配置
// 全局前置守卫beforeEach
router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
})
// 全局前置守卫afterEach
router.afterEach((to, from, next) => { NProgress.done() })
export default router 