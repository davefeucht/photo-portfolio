var path = require("path");

module.exports = {
  entry: ['./src/index.tsx'],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js"
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
          test: /\.jsx?$/,
          include: [path.join(__dirname, 'src')],
          loader: 'babel-loader',
          options: { configFile: path.resolve(__dirname, './babel.config.json') }
      },
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.js$/, loader: 'source-map-loader', enforce: 'pre' }
    ]
  }
}
