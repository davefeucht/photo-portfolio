const webpackConfig = require('./webpack.config');

module.exports = Object.assign({}, webpackConfig, {
    mode: 'development',
    devServer: {
        historyApiFallback: true,
        https: true,
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
