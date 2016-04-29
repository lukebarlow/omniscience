var webpack = require('webpack');

module.exports = {
    entry: {
        'specs' : '../../src/specs/index.js'
    },

    output: {
        path: __dirname + '/js/',
        publicPath: '/js/',
        filename: '[name].js'
    },

    module: {
        loaders: [
            { test: /\.js$/, loaders: ['babel'], exclude: /node_modules/ },
        ]
    },
    resolve: {
        extensions: ['', '.js', '.json']
    },
    devtool : 'inline-source-map'
};
