const isDev = process.env.NODE_ENV !== 'production'

const CleanWebpackPlugin = require('clean-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OfflinePlugin = require('offline-plugin')
const path = require('path')
const webpack = require('webpack')

const styleLoaders = [
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

const entry = ['babel-polyfill', './client/index.js']

const config = {
  devServer: {
    historyApiFallback: true,
    open: true,
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },

  devtool: isDev ? 'eval-source-map' : '',

  entry: isDev ? ['react-hot-loader/patch', ...entry] : entry,

  module: {
    rules: [
      {
        exclude: /node_modules\/(?!(wordwrapjs)\/).*/,
        loader: 'babel-loader',
        test: /\.js$/
      },
      {
        test: /\.scss$/,
        use: isDev
          ? ['style-loader', ...styleLoaders]
          : ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: styleLoaders
            })
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
    path: path.join(__dirname, 'dist'),
    publicPath: '/'
  },

  plugins: [
    new CopyWebpackPlugin([{ from: 'client/assets' }]),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: 'body',
      template: path.join(__dirname, '/client/index.html')
    }),

    new ExtractTextPlugin({
      allChunks: true,
      filename: 'wurd.[hash].css'
    }),

    new webpack.ContextReplacementPlugin(/moment[\\/]locale$/, /^\.\/(en)$/),
    
    new webpack.NamedModulesPlugin()
  ]
}

if (!isDev) {
  config.plugins.push(
    new CompressionPlugin({
      algorithm: 'gzip',
      asset: '[path].gz[query]',
      minRatio: 0.8,
      test: /\.(css|html|js|svg)$/,
      threshold: 10240
    }),

    new CleanWebpackPlugin('dist'),

    new webpack.optimize.CommonsChunkPlugin({
      async: true,
      children: true,
      minChunks: 2
    }),

    new webpack.optimize.ModuleConcatenationPlugin(),

    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      }
    })
  )
}

config.plugins.push(
  // It's always better if OfflinePlugin is the last plugin added
  new OfflinePlugin()
)

module.exports = config
