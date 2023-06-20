const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: false,
  // 服务器配置
  devServer: {
    open: true,
    host: "172.20.10.4",
    port:8080
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
