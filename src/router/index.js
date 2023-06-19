import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes"

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

export default router 