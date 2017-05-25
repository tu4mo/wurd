const isDev = process.env.NODE_ENV !== 'production'

const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

const styleLoaders = [
  'css-loader',
  'sass-loader',
  {
    loader: 'sass-resources-loader',
    options: {
      resources: ['./src/styles/variables.scss', './src/styles/mixins.scss']
    }
  }
]

const config = {
  devtool: isDev ? 'cheap-module-source-map' : '',

  entry: isDev
    ? ['react-hot-loader/patch', './src/index.js']
    : './src/index.js',

  output: {
    path: path.join(__dirname, 'dist'),
    filename: isDev ? 'wurd.js' : 'wurd.[hash].js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
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
        test: /\.(jpg|png|svg)$/,
        loader: 'file-loader',
        options: {
          name: './assets/[name].[hash].[ext]'
        }
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      favicon: 'src/assets/favicon.png',
      filename: 'index.html',
      inject: 'body',
      template: path.join(__dirname, '/src/index.html')
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      },
      __API__: JSON.stringify(isDev ? 'http://localhost:3000/api' : '/api')
    }),
    new ExtractTextPlugin({
      allChunks: true,
      filename: 'wurd.[hash].css'
    })
  ],

  devServer: {
    historyApiFallback: true
  }
}

if (!isDev) {
  config.plugins.push(
    new CleanWebpackPlugin('dist'),
    new webpack.ContextReplacementPlugin(/moment[\\/]locale$/, /^\.\/(en)$/),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      }
    })
  )
}

module.exports = config
