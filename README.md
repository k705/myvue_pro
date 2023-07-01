# 项目

## vue.config 配置

1. 转译包的配置
   - 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。你可以启用本选项，以避免构建后的代码中出现未转译的第三方依赖。
   - 不过，对所有的依赖都进行转译可能会降低构建速度
     `transpileDependencies:false`
2. 服务器配置

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

3. eslint 配置

   - 关闭项目的 eslint 检查
     `lintOnSave: false`
   - 关闭某个语法检查规则
     在`.eslintrc`中配置
     `"vue multi-word-component-names": 0,`

4. 路径别名的配置

   - 引入 path 模块`const path = require('path')`
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
   - 在 jsconfig 中额外再配置就会有代码书写时的提示
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

5. less 的配置
   - vue 脚手架内置了 less 的配置
   - 但是我们需要下载`less,less-loader`两个包文件
   - 在组件的 style 标签上书写属性`lang="less"`

## Header 和 Footer 公共组件
1. Header和Footer都属于公共组件,所以把组件放在components目录中
2. 在静态文件中拆分两个组件的结构和样式
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
    - index文件
        - 引入`vue、vue-router、routes`
        - 把路由作为插件进行使用`Vue.use(VueRouter)`
        - 实例化一个路由器对象 `const router = new VueRouter({routes,mode:history});`
        - 在vm配置项main中使用router配置项,向所有的组件实例中注入 $router对象和 $route对象router
        - 重写push解决编程式重复导航bug

    - routes路由表
        - 引入路由组件
        - 配置路由表

    - 在对应的点击跳转的位置将a标签改写为`<router-link to="/xxx">`(声明式导航)
    - 在对应的点击跳转的位置将button标签改写为`@click =$route.push("xx")`(编程式导航)

    - 在App中通过`<router-view>`占位

## App 组件
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

## Home 组件的静态 CV
1. 在home组件中新建首页的组件index和image文件夹
2. 在home的index文件夹中引入并注册主页组件，在template模板中渲染

## axios 拦截器配置
1. 新建request文件夹
- index
    引入创建的axios实例(request)并暴露
- request(创建的axios实例的名字)
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

## 在 devServer 中配置 proxy 跨域正向(客户端)代理配置

    ```js
        proxy: {
        "/dev-api1": {
            target: "http://gmall-h5-api.atguigu.cn/",
            changeOrigin: true,
            pathRewrite: {
            "^/dev-api1": "",
            },
    ```

## 环境变量 env 配置
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
1. 首页-一级分类列表请求及渲染
    - 每个组件都有自己的请求，写在api文件夹中
    - 一级分类列表请求
        - 在api-home.js文件中通过axios.get获取一级列表数据并暴露
        - 在TypeNav组件中拿到响应式数据
        - bug1
            - home.js中reqCategory1List使用的是分别暴露的方式，但是TypeNav组件中引入的时候却使用了默认暴露引入接口，才出现带有api的错误。
            - 改正：引入的方式加一个{}`import {reqCategory1List} from "@/api/home"`
        - bug2
            - axios实例文件夹request中拦截器配置中，if (response.data.code === 200)没加code
    - 一级分类列表渲染
        - 在一级列表对应的div中，v-for遍历请求到的数据

2. 首页一级分类列表的动态样式
    - `:class + 响应式数据`（用户的操作改变响应式数据）

3. 首页-二级分类的响应式添加和渲染
    - bug
        - methods中用到的数据要加this！！！
    - 响应式添加对象属性
        - this.$set(对象，"属性名",属性值)

4. 首页-三级分类的响应式添加和渲染

5. 首页-三级分类节流处理

6. 首页-编程式路由导航跳转search页
    - 事件委托，给父元素绑定事件，通过自定义属性保存元素的特定属性，判断子元素是否有此属性从而判断是否执行给父元素绑定的事件
    - 自定义属性，
        - 设置：`:data-xxx="xxx`
        - 获取：`e.target.dataset.xxx`
        - 自定义属性值都小写

## TypeNav组件
1. header组件点击搜索跳转search
    - 编程式路由导航
    - routes中占位
    - 响应式数据

2. 切换TypeNav为公共组件

3. TypeNav组件的条件渲染设置

4. 点击TypeNav后控制条件渲染

## mock拦截请求的配置
1. mockjs功能：
    - 生成随机数据
    - 拦截ajax请求
2. 新建requestMock的axios实例，baseUrl为/，指向自己
    - 不会走代理，不会给后端发请求(此时后端数据没写好)
    - 后端写好后把requestMock替换成request即可
3. mock使用
    - 新建mock文件夹，放入json文件数据
    - 下载mock  npm i mockjs
    - 使用Mock拦截ajax请求
        ```js
        Mock.mock("/banner.list","get",{
            code:200,
            data:banner,//json数据
            message:"成功",
            ok:true,
        })
    - main中引入mock文件夹
    - 解决mock数据后内部图片问题
        - 把组件图片放到public文件夹的图片文件夹中

## List中banner的获取及渲染

## floor组件的mock数据获取及数据渲染
因为有多个Floor组件，所以在home组件中请求数据并遍历出多个Floor
 - bug:在home组件中多引入了一个<Floor/>  

## swiper的引入及使用
1. $nextTick:将nextTick回调函数延迟到数据更新并且DOM更新之后执行，在修改数据之后立即使用它，然后等待DOM更新才回执行回调函数
2. 封装swiper公共组件
    封装不同组件相似逻辑，把不同组件的逻辑改为一样，然后进行封装

## search搜索页
1. search组件中获取动态路由参数：
    - computed直接拿到参数值
    - props在search路由中接收数据
    - watch监听动态路由改变（$route,
    -注意：初始化获取不到props的值，所以在watch中，把新得到的在props中保存的动态路由参数 交给 初始化的 searchParams 数据

2. search-页数据的列表渲染
    - 通过props把数据传给searchSelector组件，并在对应的位置遍历数据

3. search-排序按钮的逻辑
    - bug：data中没写order
    - 使用动态类控制active样式
    - 使用order为1/2来切换综合和价格的展示
    - 使用asc和des来切换`'icon-up''icon-down'`

4. search-页码组件数据控制

## Detail页

## 购物车页