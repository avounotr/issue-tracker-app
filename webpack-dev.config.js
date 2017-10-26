const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    index: [path.join(__dirname, 'app/routes/index.jsx')],
  },
  output: {
    path: path.join(__dirname, '/dist-dev/'),
    filename: '[name]-[hash].min.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      title: 'Widget',
      filename: 'index.html',
      template: './app/views/default.tpl.html',
      inject: 'body',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0', 'react'],
        },
      }, {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      }, {
        test: /\.(jpe|jpg|gif|woff|woff2|eot|ttf|svg|ico)(\?.*$|$)/,
        loader: 'url-loader?limit=100000&name=[name].[ext]',
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css', '.json', '.svg'],
    alias: {
      react: path.resolve('./node_modules/react'),
    },
  }
}
