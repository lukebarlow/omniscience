var webpack = require('webpack');

module.exports = {
    entry: {
        'omniscience' : '../../src/index.js',
        'omniscience-prong2-example' : './index.js'
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
