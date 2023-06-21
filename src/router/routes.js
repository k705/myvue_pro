// 懒加载  异步组件
const Home = () => import('@/pages/Home')
const Search = () => import("@/pages/Search");
const Login = () => import("@/pages/Login");
const Register = () => import("@/pages/Register");
const NotFound = () => import("@/pages/404");
export default [
    {
        path: "/",
        redirect: "/home"
    },
    {
        path: "/login",
        name: "Login",
        component:Login
    },
    {
        path: "/home",
        name: "Home",
        component:Home
    },
    {
        path: "/register",
        name: "Register",
        component:Register
    },
    {
        path: "/search",
        name: "Search",
        component:Search
    },
    {
        path: "*",
        name: "NotFound",
        component:NotFound
    },
] 