const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const webpack = require('webpack')
const path = require('path')

const resolve = dir => path.join(__dirname, '..', dir)

module.exports = {
  mode: 'none',
  entry: {
    sxEcharts: './src/index.js',
    'sxEcharts.min': './src/index.js',
  },
  output: {
    path: resolve('lib'),
    filename: '[name].js',
    library: 'sxEcharts',
    libraryExport: 'default',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '@': resolve('src'),
    },
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        include: /\.min\.js$/,
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new webpack.ProvidePlugin({
      _: 'lodash',
    }),
    new OptimizeCssAssetsWebpackPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  externals: {
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      root: '_',
    },
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue',
    },
  },
}
