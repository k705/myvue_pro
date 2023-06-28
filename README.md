# vue-demo

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


# myvue_pro
## 配置
1. vue.config配置
    - 转译包的配置
        - 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。你可以启用本选项，以避免构建后的代码中出现未转译的第三方依赖。
        - 不过，对所有的依赖都进行转译可能会降低构建速度
        `transpileDependencies:false`
    - 服务器配置
        ```js
            devServer: {

            //自动打开浏览器
            open: true,

            //主机地址(1. localhost 2. 127.0.0.1  3.本地ip) ps:查看本机ip地址：cmd中ipconfig
            host: "192.168.16.189",

            //端口号(0----65535,1-1023系统端口号,1024-5000属于应用端口)
            port: 8888,
        },
        ```

    - eslint配置
        - 关闭项目的eslint检查`lintOnSave: false`
        - 在`.eslintrc`中配置关闭某个语法检查规则 
        `"vue multi-word-component-names": 0,`

    - 路径别名的配置
        - 引入path模块`const path = require('path')`
        - 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。
            ```js
            configureWebpack: {
                resolve: {
                //路径别名配置(需要在jsconfig中额外再配置就会有代码书写时的提示)
                alias: {
                    "@": path.resolve(__dirname, "./src"),
                    "@comp": "@/components",
                    "@api": "@/api",
                },
                },
            },
            ```
        - 在jsconfig中额外再配置就会有代码书写时的提示
            ```js
            "paths": {
            "@/*": [
                "src/*"
            ],
            "@/comp/*": [
                "src/components/*"
            ],
            },
            ```

2. less的配置
    - vue脚手架内置了less的配置
    - 但是我们需要下载less,less-loader两个包文件
    - 在组件的style标签上书写属性lang="less"

## Header和Footer公共组件
    - Header和Footer都属于公共组件,所以把组件放在components目录中
    - 在静态文件中拆分两个组件的结构和样式
        - 在组件中分别引入所用到的图片文件
        - 引入样式重置文件到public，并在public的index中引入
    


## 路由的基础搭建
1. 新建路由文件夹pages
    - 新建Home、Login、Register、Search、404五个路由组件
        - 404
            - 点击跳转回首页用`<router-link to="/home">`
        - Home
        - Login
        - Register
        - Search
    - 设置样式`<style lang="less" scoped></style>`
2. 新建router文件夹
    - index
        - 引入`vue、vue-router、routes`
        - 把路由作为插件进行使用`Vue.use(VueRouter)`
        - 实例化一个路由器对象 `const router = new VueRouter({routes,});`
        - 在vm配置项main中使用router配置项,向所有的组件实例中注入 $router对象和 $route对象router
        - 重写push解决编程式重复导航bug

    - routes路由表
        - 引入路由组件
        - 配置路由表

    - 在对应的点击跳转的位置将a标签改写为`<router-link to="/xxx">`(声明式导航)
    - 在对应的点击跳转的位置将button标签改写为`@click =$route.push("xx")`(编程式导航)

3. 在App中通过`<router-view>`占位

## App组件
1. Footer组件
    - Footer组件的条件渲染-路由元信息方式
        - 在路由表中配置meta元信息(路由固有的属性)
    - Footer组件的条件渲染-计算属性白名单写法
        - 白名单，数据多的时候用数组或对象
    - Footer组件的条件渲染-计算属性写法
        - 当插值语法中处理数据的逻辑复杂时，写到计算属性中，用v-if控制是否渲染
    - Footer组件的条件渲染-插值写法
        - 差值表达式，用v-if控制是否渲染`<Footer v-if="$route.name !== 'Login' && $route.name !== 'Register'" /> `
    - bug:`$route.name`写成了`$router.name`!!!

## Home组件的静态CV
1. 在home组件中新建首页的组件index和image文件夹
2. 在home的index文件夹中引入并注册主页组件，在template模板中渲染

## axios拦截器配置
1. 新建request文件夹
2. index
    引入创建的axios实例(request)并暴露
3. request(创建的axios实例的名字)
    - 引入axios
    - 创建axios实例
    ```js
        const request = axios.create({
        baseURL: "/",
        timeout: 1000,
        headers:{}
        })
    ```
    - 配置请求和响应拦截器
    ```js
        //配置请求拦截器1
        request.interceptors.request.use(
        (config) => {
            console.log("请求拦截器1");
            // throw new Error("我错了1");
            return config;
        },
        (error) => {
            console.log("请求拦截器报错了1");
            return Promise.reject(error);
        },
        {
            //请求拦截器接受第三个参数是一个配置项,配置项中有一个synchronous属性,代表同步捕获错误(当前请求拦截器的成功处理函数中如果抛出错误,则被当前请求拦截器失败函数处理)
            // synchronous: true,
        }
        );


        //配置响应拦截器
        request.interceptors.response.use(
        (response) => {
            // return Promise.resolve(response.data);
            // return response.data;

            //响应拦截器中的完整配置
            //如果响应成功也要判断 是不是我们需要的内容,如果是则返回数据,如果不是则返回一个失败的promise
            if (response.data.code === 200) {
            return response.data.data;
            } else {
            return Promise.reject(response.data);
            }
        },
        (error) => {
            console.log("响应拦截器捕获错误了");
            return Promise.reject(error);
        }
        );
    ```

## 在devServer中配置proxy跨域正向(客户端)代理配置
    ```js
        proxy: {
        "/dev-api1": {
            target: "http://gmall-h5-api.atguigu.cn/",
            changeOrigin: true,
            pathRewrite: {
            "^/dev-api1": "",
            },
    ```

## 环境变量env配置
1. 上线打包后（生产环境）下没有devServer
2. 配置env环境变量 便于后期修改baseURL
3. 在根目录创建.env .env.development  env.production
4. 配置VUE_APP_API1 = /prod-api1、VUE_APP_API1 = /dev-api1
5. 在axios实例request的baseURL中配置process.env.VUE_APP_API1
6. 在生产和开发环境下就会根据VUE_APP_API1自动改变前缀
 
## 路由切换时进度条的配置
1. 下载并引入NProgress
`import NProgress from "nprogress";import "nprogress/nprogress.css";`
2. 路由切换时改变，所以在路由守卫中配置
3. 在router中配置全局前置守卫和全局后置钩子
```js
// 路由切换时进度条的配置
// 全局前置守卫beforeEach
router.beforeEach((to, from, next) => {
NProgress.start();
next();
})
// 全局前置守卫afterEach
router.afterEach((to, from, next) => { NProgress.done() })
```

## 首页分类列表
1. 一级分类列表请求及渲染
    - 一级分类列表请求数据
        - 每个组件对应一个请求文件
        - 新建api文件夹存放所有请求文件
        - 新建home组件对应的axios请求文件夹home.js,并发送get请求
        - 在TypeNav组件中引入请求的数据
        - 在mounted中初始化数据（复杂逻辑封装成函数写在methods方法中，并在mounted中调用
        - 在data中定义响应式数据
        - bug1
            - axios实例的request实例文件中响应拦截器的`return response.data.data`写成了`return response.data`
        - bug2
            - axios实例的index文件中`export  {request}`写成了`export default {request}`

    - 一级分类列表渲染

2. 首页一级分类列表的动态样式
    - 动态类绑定 对象写法`:class="{active:mouseEnterIndex===index}"`
    - 响应式数据 `data(){return{mouseEnterIndex:-1}`
    - 绑定事件，改变数据

3. 首页-鼠标移入一级请求二级
    - home.js中根据一级分类列表id请求二级列表数据
    - 在TypeNav组件中引入请求的数据
    - 响应式添加方式1：this.$set添加对象的属性
    
4. 首页-三级分类的响应式添加和渲染
    - home.js中根据二级分类列表id请求三级列表数据
    - 把一个二级中所有的三级全部请求到，并添加在对应的二级的children属性上
    - 遍历二级列表,拿到每一个id请求对应的三级,并添加在children上

5. 首页-三级分类节流处理
    - 安装lodash
    - 把一级分类鼠标移入事件函数 交给 throttle函数 得到一个新的节流函数  多少秒后执行
    - 解决bug：节流之后 鼠标移出整个区域 还会再执行一次函数的问题

6. 首页-三级分类的声明式路由导航
    - `<router-link></router-link>`会导致三级列表加载慢，且使用事件委托后不方便
7. 首页-编程式路由导航跳转search页
    - 事件委托，子元素有很多相同操作的时候，把事件绑定在父元素上，通过冒泡使得点击子元素也能触发事件
    - 要获取category1Id、category2Id、category3Id、categoryName，添加自定义属性保存`:data-category3Id="category3.id"`
    - 编程式路由导航
        ```js
        this.$router.push({ name: "Search",query: {
          category1id: category1id,
          category2Id: category2id,
          category3Id: category3id,
          categoryName: categoryname,
        },
        params,
      });
      ```
      - bug:`this.$router.push`写成了`this.$route.push`！！

## header组件点击搜索跳转search
1. 动态路由传参
    - v-model响应式数据
2. 编程式路由导航
    - params不能和path一起用
    - params不能为空字符串
    - 在routes中给params占位

## 切换TypeNav为公共组件
1. 在main.js中全局注册公共组件`Vue.component("TypeNav",TypeNav)`
2. 删除home组件中的引入


## TypeNav组件的条件渲染设置
    - 增加一个计算属性控制typenav的显示
    - 如果在主页则一直显示
    - 如果不在主页则通过鼠标是否移入来显示隐藏 v-show

## 点击TypeNav后控制条件渲染
    - 在toshow方法中导航到search组件后设置 保存鼠标是否移入的属性为false  从而点击后不会一直显示

## swiper的基础使用

## mock拦截请求的配置
1. 安装下载`npm i mockjs`
1. 新建ajax实例 baseURL改为/ index文件中引入requestMock
2. 新建mock文件夹拦截axios请求
3. 引入mock文件，发送请求
4. main.js中引入mock文件夹
5. 轮播图区域引入mock请求
6. 上线后把requestMock改为request，发送真正的请求

## List中banner的获取及渲染
1. methods中封装函数获取数据
2. mounted中调用函数
3. data中初始化数据
4. html中遍历数据

## swiper的引入及使用
1. `npm i swiper@5`
2. 封装swiper公共组件
3. 在入口文件main中引入swiper的css
4. 在需要的组件的轮播图中插入Swiper组件

## 在组件中拿到动态路由参数
1. 动态路由中监听动态路由参数的改变和获取动态路由参数的三个方法：
    - watch：监听动态路由改变，之后做一些逻辑
    - computed：监听动态路由改变+得到值
    - 路由传参props：使用props得到动态路由的值
2. props三种写法：
    - 布尔值：默认把params参数通过props传递给组件
    - 对象：把对象内部的属性作为props传给组件
    - 函数：把函数return的对象中的属性作为props传给组件，接收当前的$route作为参数
3. 平台属性列表：attrsList
    销售属性列表：goodsList 
4. 初始化获取不到props值，所以在watch中立即监听数据

## search-页数据的列表渲染
1. 通过props父子传值把trademarkList、attrsList传入SearchSelector组件中
2. 
