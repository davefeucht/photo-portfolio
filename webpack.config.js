"use strict"

var webpack = require("webpack");
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  target: "web",
  entry: {
    app: path.join(__dirname, "src/components", "Index.jsx")
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./build"
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
          presets: ["env", "react"],
          plugins: ["transform-class-properties"]
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: "css-loader" 
        })
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
