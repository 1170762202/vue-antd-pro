const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

// vue.config.js
module.exports = {


    // devServer: {
    //     // development server port 8000
    //     port: 8000,
    //     proxy: {
    //       '/api': {
    //         // target: 'https://mock.ihx.me/mock/5baf3052f7da7e07e04a5116/antd-pro',
    //         target: 'https://www.baidu.com/',
    //         changeOrigin: true,
    //           pathrewrite: {
    //               '^/api': '/'
    //           }
    //       }
    //     }
    // },


}
