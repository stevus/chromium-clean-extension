const path = require('path')
const webpack = require('webpack')

const config = {
    entry: {
      extension: './application/index.js'
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].js',
        publicPath: '/'
    }
};

module.exports = (env, argv) => {
    return config;
};
