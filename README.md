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
    - jsconfig中额外再配置就会有代码书写时的提示