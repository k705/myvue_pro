const Home = () => import("@/pages/Home")
const Login = () => import("@/pages/Login")
const Register = () => import("@/pages/Register")
const Search = () => import("@/pages/Search")
const Detail = () => import("@/pages/Detail")
const AddCartSuccess = () => import("@/pages/AddCartSuccess")
const ShopCart = () => import("@/pages/ShopCart")
const Trade = () => import("@/pages/Trade")
const Pay = () => import("@/pages/Pay")
const PaySuccess = () => import("@/pages/Pay")
const Center = () => import("@/pages/Center");
const MyOrder = () => import("@/pages/Center/components/MyOrder");
const TeamOrder = () => import("@/pages/Center/components/TeamOrder");
const NotFound = () => import("@/pages/404")

export default [
    {
        path: "/",
        redirect: "/home"
    },
    {
        path: "/home",
        name: "Home",
        component: Home
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        meta: {
            FooterHidden: true
        }
    }, {
        path: "/register",
        name: "Register",
        component: Register,
        meta: {
            FooterHidden: true
        }

    }, {
        path: "/search:keyword?",
        name: "Search",
        component: Search
    },
    {
        path: "/detail:skuId",
        name: "Detail",
        component: Detail
    }, {
        path: "/addCartSuccess",
        name: "AddCartSuccess",
        component: AddCartSuccess
    }, {
        path: "/shopCart",
        name: "ShopCart",
        component: ShopCart
    }, {
        path: "/trade",
        name: "Trade",
        component: Trade
    }, {
        path: "/center",
        component: Center,
        name: "Center",
        meta: {
            isAuth: true,
        },
        redirect: "/center/myOrder",
        children: [
            {
                path: "myOrder",
                name: "MyOrder",
                component: MyOrder,
                meta: {
                    isAuth: true,
                },
            },
            {
                path: "teamOrder",
                name: "TeamOrder",
                component: TeamOrder,
                meta: {
                    isAuth: true,
                },
            },
        ],
    },
    {
        path: "/pay/:orderId",
        component: Pay,
        name: "Pay",
        meta: {
            isAuth: true,
        },
        beforeEnter: (to, from, next) => {
            if (from.name === "Trade") {
                next();
            } else {
                next("/shopCart");
            }
        },
    },
    {
        path: "/paySuccess",
        component: PaySuccess,
        name: "PaySuccess",
        meta: {
            isAuth: true,
        },
        beforeEnter: (to, from, next) => {
            if (from.name === "Pay") {
                next();
            } else {
                next("/shopCart");
            }
        },
    }, {
        path: "/*",
        name: "NotFound",
        component: NotFound
    },
]