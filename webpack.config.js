const path = require('path')
const webpack = require('webpack')

const config = {
    entry: {
      'background': './application/index.js',
      'browser-action': './application/browser-action/index.js',
      'web-navigation': './application/web-navigation/index.js'
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
