const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

// vue.config.js
module.exports = {
    css: {
        loaderOptions: {
            less: {
                modifyVars: {
                    'primary-color': '#1DA57A',
                    'link-color': '#1DA57A',
                    'border-radius-base': '2px',
                },
                javascriptEnabled: true
            }
        }
    }
}
