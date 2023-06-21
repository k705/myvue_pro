import Vue from "vue";
import VueRouter from "vue-router"
import routes from '@/router/routes'

Vue.use(VueRouter)

const router = new VueRouter({
    mode:"history",
    routes,
})
// 重写push
const oldReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function (
  loaction,
  onComplate = () => {},
  onAbort = () => {}
) {
  oldReplace.call(this, loaction, onComplate, onAbort);
};
export default router