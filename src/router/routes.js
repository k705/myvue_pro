const Home = ()=>import("@/pages/Home")
const Login = ()=>import("@/pages/Login")
const Register = ()=>import("@/pages/Register")
const Search = () => import("@/pages/Search")
const Detail = ()=>import("@/pages/Detail")
const AddCartSuccess = ()=>import("@/pages/AddCartSuccess")
const ShopCart = ()=>import("@/pages/ShopCart")
const Trade = ()=>import("@/pages/Trade")

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
        component: Login,
        meta: {
            FooterHidden:true
        }
    },{
        path: "/register",
        name: "Register",
        component: Register,
        meta: {
            FooterHidden:true
        }
        
    },{
        path: "/search:keyword?",
        name: "Search",
        component:Search
    },
    {
        path: "/detail:skuId",
        name: "Detail",
        component:Detail
    },{
      path: "/addCartSuccess",
      name: "AddCartSuccess",
      component:AddCartSuccess
  },{
    path: "/shopCart",
    name: "ShopCart",
    component:ShopCart
},{
    path: "/trade",
    name: "Trade",
    component:Trade
},{
        path: "/*",
        name: "NotFound",
        component:NotFound
    },
]