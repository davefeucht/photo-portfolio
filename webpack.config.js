var path = require("path");

module.exports = {
  entry: ['./src/index.tsx'],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js"
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx'],
    modules: ['node_modules', path.resolve(__dirname, 'src')]
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|jsx|tsx)?$/,
        use: 'ts-loader'
      },
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.js$/, loader: 'source-map-loader', enforce: 'pre' }
    ]
  }
}
