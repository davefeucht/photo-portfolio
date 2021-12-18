const path = require('path');
const webpackConfig = require('./webpack.config');

module.exports = Object.assign({}, webpackConfig, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.min.js',
        library: 'photo-portfolio',
        libraryTarget: 'umd',
        globalObject: 'window'
    },
    plugins: []
});
