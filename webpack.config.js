"use strict"

var webpack = require("webpack");
var path = require("path");
var fs = require("fs");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  mode: "development",
  target: "web",
  entry: {
    app: path.join(__dirname, "src/components", "Index.jsx")
  },
  devtool: "inline-source-map",
  devServer: {
    https: {
      cert: fs.readFileSync('/Users/agnes/ssl_cert/cert.pem'),
      key: fs.readFileSync('/Users/agnes/ssl_cert/key.pem')
    },
    contentBase: "./build/",
    compress: true
  },
  output: {
    path: path.resolve(__dirname, "build/js"),
    filename: "index.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: [
            ["@babel/plugin-proposal-decorators", {"decoratorsBeforeExport": true}],
            "@babel/plugin-proposal-class-properties"
          ]
        }
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: "css-loader"
          }, {
            loader: "sass-loader"
          }]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("../css/site.css")
  ]
}
