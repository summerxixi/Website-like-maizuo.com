const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
 devServer: {
    proxy: {
      '/eva': {
        target: 'https://m.maoyan.com',
        changeOrigin: true,
        pathRewrite:{
          '/eva':''  //'^/eva' 正则表达式的写法，把eva及前面的部分（/eva）改为‘’
        }
      }

      // '/info': {
      //   target: 'http://127.0.0.1:4000',
      //   changeOrigin: true,
      // }
    }
  }
})

// 配置反向代理浏览器之间存在跨域问题，但是服务器之间没有跨域（后端与后端之间没有跨域） 故在服务器上配置返向代理，返回给axios请求
