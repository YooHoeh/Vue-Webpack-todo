const path = require('path')  //必须先导入这个包，用于管理路径
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HTMLPlugin = require('html-webpack-plugin');
const ExtractPlugin = require('extract-text-webpack-plugin')  //将非js文件单独打包的工具
const isDev = process.env.NODE_ENV === 'development'

const config = {
  target: 'web',
  entry: path.join(__dirname, 'src/index.js'),    //配置入口文件路径，这里的__dirname为系统变量，表示项目根目录
  output: {   //配置build文件输出路径
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [    //添加各个类型的loader，是一个数组
      {
        test: /\.vue$/,   //采用正则来匹配文件类型
        loader: require.resolve('vue-loader'),  //选择loader，一般名字都是filetype-loader,需要先用npm i 安装对应的loader
        options: {
        }
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {    //使用options往loader里面传额外的参数
              limit: 1024,
              name: '[name]-aaa.[ext]'
            }
          }
        ]
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [    //在这里添加各种插件，这里的插件都需要先在前面require
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new HTMLPlugin(),
    new VueLoaderPlugin()
  ]
}

if (isDev) {    //判断是否是在开发环境下进行配置
  config.module.rules.push(
    {
      test: /\.styl(us)?$/,
      use: [    //使用多个loader时使用use语句，按照从后往前的解析顺序写，这里是先使用css-loader,再使用style-loader
        'style-loader',
        'css-loader',
        'postcss-loader',
        'stylus-loader',
      ]
    }
  )
  config.devtool = '#cheap-module-eval-source-map'  //调试器，不然按F12只有一个打包后的代码不利于调试

  config.devServer = {
    port: '8000',   //设置端口
    host: 'localhost',      //设置ip,推荐设置0.0.0.0而不是localhost,这样的话就可以在网页上既可以用localhost登录也可以在内网手机输入ip登入
    overlay: {
      errors: true,   //有错误时是否将错误在网页显示
    },
    open: true,  //编译完成自动用浏览器打开
    historyApiFallback: true, //将一些错误地址或者没有定义的地址跳转，类似于Not Found 404
    // hot: true    //打开局部热加载,因为后面使用了实时更新的功能，所以关闭热加载
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),   //启动热加载功能需要添加的插件
    new webpack.NoEmitOnErrorsPlugin()  //减少一些不必要的调试信息展示问题
  )
} else {
  config.entry = {
    app: path.join(__dirname, 'src/index.js'),
    vendor: ['vue']
  }
  config.output.filename = '[name].[chunkhash:8].js'
  config.module.rules.push(
    {
      test: /\.styl(us)?$/,
      use: ExtractPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            }
          },
          'stylus-loader'
        ]
      })
    }
  )
  config.plugins.push(
    new ExtractPlugin('styles.[chunkhash:8].css'),
  )
  config.optimization = {
    splitChunks: {
      name: 'verdor'
    }
  }
  config.optimization = {
    splitChunks: {
      name: 'runtime'
    }
  }
}
module.exports = config;