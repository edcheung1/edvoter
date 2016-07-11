require('dotenv').load();

var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: path.join(__dirname, "src"),
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./js/client.js",
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
        }
      }, {
        test: /node_modules[\\\/]auth0-lock[\\\/].*\.js$/,
        loaders: [
          'transform-loader/cacheable?brfs',
          'transform-loader/cacheable?packageify'
        ]
      }, {
        test: /node_modules[\\\/]auth0-lock[\\\/].*\.ejs$/,
        loader: 'transform-loader/cacheable?ejsify'
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  output: {
    path: __dirname + "/src/",
    filename: "client.min.js"
  },
  plugins: debug ? [
    new webpack.DefinePlugin({
      'process.env': {
        'AUTH0_CLIENT_ID': JSON.stringify(process.env.AUTH0_CLIENT_ID),
        'AUTH0_DOMAIN': JSON.stringify(process.env.AUTH0_DOMAIN)
      }
    }),
    new webpack.ProvidePlugin({
      d3: 'd3'
    })
    ] : [
    new webpack.DefinePlugin({
      'process.env': {
        'AUTH0_CLIENT_ID': JSON.stringify(process.env.AUTH0_CLIENT_ID),
        'AUTH0_DOMAIN': JSON.stringify(process.env.AUTH0_DOMAIN)
      }
    }),
    new webpack.ProvidePlugin({
      d3: 'd3'
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
};