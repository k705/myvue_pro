import Vue from "vue";
import VueRouter from "vue-router"
import routes from '@/router/routes'
import NProgress from "nprogress"
import "nprogress/nprogress.css";

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

// 进度条
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})
router.afterEach(() => {
  NProgress.done()
})
export default router