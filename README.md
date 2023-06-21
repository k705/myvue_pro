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


# 项目
## vue.config配置
1. 是否转译依赖transpileDependencies
2. 服务器配置devServer
    - open：是否自动打开浏览器
    - host：本地ip地址
    - port：端口号
3. 打包配置configureWebpack
    - 路径别名配置alias`"@": path.resolve(__dirname, "./src")`
    - 使用了path一定要引入！！！！
    - jsconfig中额外再配置就会有代码书写时的提示
4. 配置eslint
    - 关闭项目eslint语法检查
        `lintOnSave:false`
    - 关闭某个语法检查
        在eslintrc.js文件中把某个语法检查设置为"warn"、"off"、0、1

## Header、Footer公共组件
1. 注意引入样式重置文件

## 路由基础搭建
1. pages文件夹：路由组件
2. router文件夹：配置路由

## Footer组件控制显示
1. 白名单 （多个数据用数组或对象）
2. 元信息 （某个组件特定的信息路由表中配meta）

## axios配置
