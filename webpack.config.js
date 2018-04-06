const isDev = process.env.NODE_ENV !== 'production'

const CleanWebpackPlugin = require('clean-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OfflinePlugin = require('offline-plugin')
const path = require('path')
const webpack = require('webpack')

const config = {
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },

  devtool: isDev ? 'cheap-module-source-map' : 'source-map',

  entry: ['babel-polyfill', './client/index.js'],

  mode: isDev ? 'development' : 'production',

  module: {
    rules: [
      {
        exclude: /node_modules/,
        loader: 'babel-loader',
        test: /\.js$/
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                './client/styles/variables.scss',
                './client/styles/mixins.scss'
              ]
            }
          }
        ]
      },
      {
        loader: 'file-loader',
        options: {
          name: './images/[name].[hash].[ext]'
        },
        test: /\.(jpg|png|svg)$/
      }
    ]
  },

  output: {
    filename: isDev ? 'wurd.js' : 'wurd.[hash].js',
    publicPath: '/'
  },

  plugins: [
    new CopyWebpackPlugin([{ from: 'client/assets' }]),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: 'body',
      template: path.join(__dirname, '/client/index.html')
    }),

    new webpack.ContextReplacementPlugin(/moment[\\/]locale$/, /^\.\/(en)$/),

    ...(!isDev
      ? [
          new CompressionPlugin({
            algorithm: 'gzip',
            asset: '[path].gz[query]',
            minRatio: 0.8,
            test: /\.(css|html|js|svg)$/,
            threshold: 10240
          }),

          new CleanWebpackPlugin('dist')
        ]
      : []),

    // It's always better if OfflinePlugin is the last plugin added
    new OfflinePlugin({
      ServiceWorker: {
        // Minifying doesn't work with webpack 4 yet
        minify: false
      }
    })
  ]
}

module.exports = config
