const Home = () => import("@/pages/Home");
const Search = () => import("@/pages/Search");
const Login = () => import("@/pages/Login");
const Register = () => import("@/pages/Register");
const NotFound = () => import("@/pages/404");
const Detail = () => import("@/pages/Detail");
const AddCartSuccess = () => import("@/pages/AddCartSuccess");
const ShopCart = () => import("@/pages/ShopCart");
const Trade = () => import("@/pages/Trade");
export default [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/login",
    component: Login,
    name: "Login",
    meta: {
      FooterIsHidden: true,
    },
  },
  {
    path: "/register",
    component: Register,
    name: "Register",
    meta: {
      FooterIsHidden: true,
    },
  },
  {
    path: "/home",
    component: Home,
    name: "Home",
  },
  {
    path: "/search/:keyword?",
    component: Search,
    name: "Search",
    /* 
      props三种写法:
        1. 布尔值:默认把params参数通过props传递给组件
        2. 对象:把对象内部的属性作为props传递给组件
        3. 函数:把函数return的对象中的属性作为props传递给组件,函数接受当前的$route作为参数
    */
    /* props($route) {
      return {
        ...$route.params,
        ...$route.query,
      };
    }, */
  },
  {
    path: "/detail/:skuId",
    component: Detail,
    name: "Detail",
  },
  {
    path: "/addCartSuccess",
    component: AddCartSuccess,
    name: "AddCartSuccess",
  },
  {
    path: "/shopCart",
    component: ShopCart,
    name: "ShopCart",
  },
  {
    path: "/trade",
    component: Trade,
    name: "Trade",
    meta: {
      isAuth: true,
    },
  },
  {
    path: "*",
    component: NotFound,
    name: "NotFound",
  },
];
