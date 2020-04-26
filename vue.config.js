// const path = require('path')

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        // 目标 API 地址
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
