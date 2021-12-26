var path = require("path");

module.exports = {
  entry: ['./src/index.jsx'],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
          test: /\.jsx?$/,
          include: [path.join(__dirname, 'src')],
          loader: 'babel-loader',
          options: { configFile: path.resolve(__dirname, './.babelrc') }
      },
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.js$/, loader: 'source-map-loader', enforce: 'pre' }
    ]
  }
}
