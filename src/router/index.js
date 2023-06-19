import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes"

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes
})


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