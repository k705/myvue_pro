import Vue from "vue";
import VueRouter from "vue-router"
import routes from '@/router/routes'
// 把路由作为插件进行使用
Vue.use(VueRouter)
// 实例化路由器对象
const router = new VueRouter({
    routes,
})
// 重写push解决编程式路由重复导航bug
const oldPush = VueRouter.prototype.push
VueRouter.prototype.push = function (location,onComplete=()=>{},onAbort=()=>{}){
     oldPush.call(this,location,onComplete,onAbort)   
}

const oldReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function (location,onComplete=()=>{},onAbort=()=>{}) {
        oldReplace.call(this,location,onComplete,onAbort)
    }
export default router