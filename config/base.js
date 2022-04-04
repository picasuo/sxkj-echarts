const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')

const resolve = dir => path.join(__dirname, '..', dir)
const { checkPort } = require('./utils/check')

const dev = require('./dev')
const prod = require('./prod')

const buildConfig = env => {
  let isProd = process.env.NODE_ENV === 'production'
  let base = {
    entry: './example/main.js',
    output: {
      // 指定在浏览器中所引用的「此输出目录对应的公开 URL」
      publicPath: isProd ? '/sxkj-echarts/' : '/',
      path: resolve('dist'),
      filename: 'js/[name].js',
      chunkFilename: 'js/[name]_[chunkhash:8].js',
    },
    resolve: {
      extensions: ['.js', '.vue'],
      alias: {
        '@': resolve('src'),
        example: resolve('example'),
      },
    },
    devServer: {
      contentBase: resolve('dist'),
      historyApiFallback: true, // use h5 history and run index.html when 404
      open: true,
      port: 9090,
      hot: true,
      hotOnly: true,
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          verdors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            name: 'verdor',
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.css$/,
          use: [
            !isProd ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
          ],
        },
        {
          test: /\.scss$/,
          use: [
            !isProd ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                prependData: '@import "example/assets/scss/main.scss";',
              },
            },
          ],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader', 'eslint-loader'],
        },
      ],
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.ProvidePlugin({
        _: 'lodash',
      }),
      new VueLoaderPlugin(),
      new CleanWebpackPlugin(),
      new OptimizeCssAssetsWebpackPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name]_[contenthash:8].css', // MiniCssExtractPlugin 使用 [contenthash]
      }),
      new HtmlWebpackPlugin({
        title: 'SXKJ-ECHARTS-DEMO',
        filename: 'index.html',
        template: resolve('./example/public/index.html'),
        // favicon: './src/img/favicon.ico',
        inject: true,
        chunks: 'all',
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false,
        },
      }),
    ],
  }
  if (isProd) return merge(base, prod)
  else
    return checkPort(9090).then(port => {
      base.devServer.port = port
      return merge(base, dev)
    })
}

module.exports = env => buildConfig(env)
