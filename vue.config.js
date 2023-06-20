const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  transpileDependencies: false,

  devServer: {

    //自动打开浏览器
    open: true,

    //主机地址(1. localhost 2. 127.0.0.1  3.本地ip) ps:查看本机ip地址：cmd中ipconfig
    host: "172.20.10.4",
    
    //端口号(0----65535,1-1023系统端口号,1024-5000属于应用端口)
    port: 8888,
    proxy: {
      "/dev-api1": {
        target: "http://gmall-h5-api.atguigu.cn/",
        changeOrigin: true,
        pathRewrite: {
          "^/dev-api1":""
        }
      }
    }
},
 //关闭项目的eslint检查
  // lintOnSave: false,

  //如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。
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
