/**
 * @fileOverview app配置
 * @author lihr
 * @date 2018/11/09
 */

const path = require('path')
const debug = process.env.NODE_ENV !== 'production'
const VueConf = require('./config/vue_config_class')
const vueConf = new VueConf(process.argv)
const baseURI = 'https://www.****.com'// 这里可以配置oss/cdn路径
console.log('')
console.log(
  '----------------------本地启动或构建的文件信息 | start-----------------------------'
)
console.log(vueConf.pages)
console.log(
  '----------------------本地启动或构建的文件信息 | end-------------------------------'
)
console.log('')

module.exports = {
  baseUrl: debug ? '/' : './', // 根域上下文目录
  // baseUrl: baseURI + vueConf.baseUrl, // 根域上下文目录
  outputDir: `dist/${process.argv.slice(3)}`, // 构建输出目录
  assetsDir: 'assets', // 静态资源目录 (js, css, img, fonts)
  pages: vueConf.pages,
  lintOnSave: true, // 是否开启eslint保存检测，有效值：ture | false | 'error'
  runtimeCompiler: true, // 运行时版本是否需要编译
  transpileDependencies: [], // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
  productionSourceMap: false, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
  configureWebpack: config => {
    // webpack配置，值位对象时会合并配置，为方法时会改写配置
    if (debug) {
      // 开发环境配置
      config.devtool = 'cheap-module-eval-source-map'
    } else {
      // 生产环境配置
    }
    Object.assign(config, {
      // 开发生产共同配置
      resolve: {
        extensions: ['.js', '.jsx', '.vue', '.json'],
        alias: {
          '@': path.resolve(__dirname, './src'),
          '@c': path.resolve(__dirname, './src/components'),
          vue$: 'vue/dist/vue.esm.js'
        }
      }
    })
  },
  chainWebpack: config => {
    Object.keys(vueConf.pages).forEach(entryName => {
      // 移除 preload 插件
      config.plugins.delete(`preload-${entryName}`)
      // 移除 prefetch 插件
      config.plugins.delete(`prefetch-${entryName}`)
    })
    // webpack外部扩展链接API，用于生成和修改webapck配置，https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
   /* config.externals({
      'vue': 'Vue',
      'vuex': 'Vuex',
      'vue-router': 'VueRouter'
    })*/
    if (debug) {
      // 本地开发配置
    } else {
      // 生产开发配置
    }
  },
  css: {
    // 配置高于chainWebpack中关于css loader的配置
    // modules: true, // 是否开启支持‘foo.module.css’样式,-----element-ui会引入会报错
    modules: false, // 是否开启支持‘foo.module.css’样式
    // extract: true, // 是否使用css分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用<style>方式内联至html文件中
    sourceMap: false, // 是否在构建样式地图，false将提高构建速度
    loaderOptions: {
      // css预设器配置项
      css: {
        localIdentName: '[name]-[hash]',
        camelCase: 'only'
      },
      stylus: {}
    }
  },
  // parallel: require('os').cpus().length > 1, // 构建时开启多进程处理babel编译
  parallel: true, // 构建时开启多进程处理babel编译
  pluginOptions: {
    // 第三方插件配置
  },
  pwa: {
    // 单页插件相关配置 https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  },
  devServer: {
    publicPath: '/',
    open: true,
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: {
      '/api': {
        target: '<url>',
        ws: true,
        changOrigin: true
      }
    },
    before: app => {
    }
  }
}
