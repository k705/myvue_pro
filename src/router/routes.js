const Home = ()=>import("@/pages/Home")
const Login = ()=>import("@/pages/Login")
const Register = ()=>import("@/pages/Register")
const Search = ()=>import("@/pages/Search")
const NotFound = () => import("@/pages/404")

export default [
    {
        path: "/",
        redirect:"/home"
    },
    {
        path: "/home",
        name: "Home",
        component:Home
    },
    {
        path: "/login",
        name: "Login",
        component:Login
    },{
        path: "/register",
        name: "Register",
        component:Register
    },{
        path: "/search",
        name: "Search",
        component:Search
    },{
        path: "/*",
        name: "NotFound",
        component:NotFound
    },
]