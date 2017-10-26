const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');

module.exports = {
  entry: {
    index: path.join(__dirname, 'app/routes/index.jsx'),
  },
  output: {
    path: path.join(__dirname, '/dist-prod/'),
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
    new webpack.optimize.UglifyJsPlugin({
      cacheFolder: path.resolve(__dirname, '/dist-prod/cached_uglify/'),
      debug: false,
      minimize: true,
      sourceMap: true,
      mangle: true,
      comments: false,
      compress: {
        warnings: false,
        screw_ie8: false,
      },
    }),
    new StatsPlugin('webpack.stats.json', {
      source: false,
      modules: false,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new Visualizer({ filename: './statistics.html' }),
  ],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        exclude: /(node_modules|deploy)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0', 'react'],
        },
      }, {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      }, {
        test: /\.(jpe|jpg|png|gif|svg|ico|woff|woff2|eot|ttf)(\?.*$|$)/,
        loader: 'url-loader?limit=100000&name=[name].[ext]',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css', '.json', '.svg'],
    alias: {
      react: path.resolve('./node_modules/react'),
    },
  },
};
