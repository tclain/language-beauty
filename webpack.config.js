const path = require('path');
const html = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: './client/index.js'
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'static')
    },
    devtool : "cheap-sourcemap",
    plugins : [
        new html({
            filename : "index.html",
            template : "client/index.html"
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.jsx?$/,
                use: [
                    'babel-loader',
                ]
            },
        ]
    }
};