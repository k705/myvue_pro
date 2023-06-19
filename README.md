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

2. less的配置
    - vue脚手架内置了less的配置
    - 但是我们需要下载less,less-loader两个包文件
    - 在组件的style标签上书写属性lang="less"

3. Header和Footer公共组件
    - Header和Footer都属于公共组件,所以把组件放在components目录中
    - 在静态文件中拆分两个组件的结构和样式
        - 在组件中分别引入所用到的图片文件
        - 引入样式重置文件到public，并在public的index中引入