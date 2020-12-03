const path = require('path');
const webpack = require('webpack')
// 导入compression-webpack-plugin
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// 定义压缩文件类型
const productionGzipExtensions = ['js', 'css']
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    chainWebpack: (config)=>{
        config.resolve.alias
            .set('styles',resolve('src/assets/styles'))
            .set('common',resolve('src/common'))
            .set('js',resolve('src/assets/js'))
        // 移除 preload 插件
        config.plugins.delete('preload')
        // 移除 prefetch 插件
        config.plugins.delete('prefetch')
        //config.plugins.delete('preload-${name}')//可配置移除预加载的页面。eg:login.html则添加config.plugins.delete('preload-login'),
    },

    devServer: {
        proxy: {
            // proxy all requests starting with /api to jsonplaceholder
            '/api': {
                target: 'http://120.78.3.66:8088',   //代理接口
                // target: 'http://192.168.101.102:8080',   //代理接口
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'    //代理的路径
                }
            }
        }
    },
    publicPath: '/',    //  ./表示相对路径， 可以部署在任意路径下，如果为 / 则只能在nginx的html的根路径下面，如果指定为/app/ ，则可以部署在/app下面，默认为/
    outputDir: 'furn', // 构建输出目录
    assetsDir: 'assets', // 静态资源目录 (js, css, img, fonts)

    configureWebpack : {
        // performance: {
        //     hints:'warning',
        //     //入口起点的最大体积 整数类型（以字节为单位）
        //     maxEntrypointSize: 50000000,
        //     //生成文件的最大体积 整数类型（以字节为单位 300k）
        //     maxAssetSize: 30000000,
        //     //只给出 js 文件的性能提示
        //     assetFilter: function(assetFilename) {
        //         return assetFilename.endsWith('.js')
        //     }
        // },
        plugins: [
            new CompressionWebpackPlugin({
                filename: '[path].gz[query]',
                algorithm: 'gzip',
                test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                threshold: 10240,
                minRatio: 0.8
            }),
            new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 5,
                minChunkSize: 100
            })
        ]
    }
}
