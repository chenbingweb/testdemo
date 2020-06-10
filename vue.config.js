const webpack = require('webpack');
const path = require('path');
function resolve (dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    // webpack 配置进行更细粒度的修改  https://cli.vuejs.org/zh/config/#chainwebpack
    chainWebpack: (config)=>{
        //修改文件引入自定义路径
        config.resolve.alias
            .set('@', resolve('src'))
            .set('style', resolve('src/assets/style'))

        config.module
            .rule('images')
            .use('url-loader')
            .loader('url-loader')
            .tap(options => Object.assign(options, { limit: 40000 }))
    },
    // publicPath: process.env.NODE_ENV === "production" ? "/dist" : "/", //部署应用包时的基本 URL
    // outputDir: "dist", //打包目录
    publicPath: process.env.NODE_ENV === "production" ? "./" : "./", //部署应用包时的基本 URL
    outputDir: "dist", //打包目录
    indexPath: "index.html",
    devServer: {
        open: false,
        port: 1024,
        overlay: {
            errors: true,
            warnings: true
        },
        proxy: {
            '': {
              target:'http://pplmapi.jeemoo.com/',
              ws: true,
              changeOrigin: true
            },
           
         
        }
    },

    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "windows.jQuery": "jquery"
            })
        ]
    }
}