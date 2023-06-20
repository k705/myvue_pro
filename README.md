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
1. 转译配置
    - 启用本选项，以避免构建后的代码中出现未转译的第三方依赖。
    - 对所有的依赖都进行转译可能会降低构建速度
    `transpileDependencies: false,`

2. 服务器配置devServer
    - 是否自动在浏览器打开open
    - 主机地址host
    - 端口号port

3. webpack配置
    - 路径别名配置alias
    - 在jsconfig配置代码书写提示