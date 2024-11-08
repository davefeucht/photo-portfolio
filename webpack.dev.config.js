const webpackConfig = require('./webpack.config');
const { merge } = require('webpack-merge');

module.exports = merge(webpackConfig, {
    mode: 'development',
    devServer: {
        historyApiFallback: true,
        server: 'https',
        host: '0.0.0.0',
        port: 8080,
        static: [
            {
                directory: './src',
                staticOptions: {},
                watch: true
            }
        ],
        allowedHosts: 'all'
    },
    devtool: 'inline-source-map'
});
