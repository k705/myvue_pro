const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  //默认情况下 babel-loader 会忽略所有 node_modules 中的文件。你可以启用本选项，以避免构建后的代码中出现未转译的第三方依赖。
  //不过，对所有的依赖都进行转译可能会降低构建速度
  transpileDependencies: false,

  // 服务器配置
  devServer: {
    // 是否自动打开浏览器
    open: true,
    // 主机地址(1.localhost  2.127.0.0.1 3.本地ip：cmd中查找ipconfig)
    host: '192.168.16.71',
    // 端口号 (0----65535,1-1023系统端口号,1024-5000属于应用端口)
    port:8080
  },

  // 配置eslint检查是否打开
  // lintOnSave:false

  //如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。
  configureWebpack: {
    resolve: {
      //路径别名配置(需要在jsconfig中额外再配置就会有代码书写时的提示)
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@comp': '@/components',
        '@api':'@/api'
      }

    }
  }

})
