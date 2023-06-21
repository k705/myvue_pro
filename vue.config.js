const { defineConfig } = require('@vue/cli-service')
const path = require("path")
module.exports = defineConfig({
  transpileDependencies: false,
  // 服务器配置
  devServer: {
    open: true,
    host: "127.0.0.1",
    port: 8888,
    //代理
    proxy: {
      "/dev-api1": {
        target: "http://gmall-h5-api.atguigu.cn/",
        changeOrigin: true,
        pathRewrite: {
          "^/dev-api1": "",
        },
      },
    },
  },
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
})
