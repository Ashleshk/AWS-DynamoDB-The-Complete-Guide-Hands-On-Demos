var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.config.common.js');
const path = require('path');

const API_ROOT = process.env.API_ROOT = 'http://localhost:3000';
const METADATA = webpackMerge(commonConfig.metadata, {
    API_ROOT: API_ROOT
});

module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-eval-source-map',
    output: {
        path: path.resolve(__dirname, './public/scripts/app'),
        publicPath: '/scripts/app',
        filename: 'bundle.js',
        chunkFilename: '[id].chunk.js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    { loader: 'awesome-typescript-loader', options: {
                        transpileOnly: true
                    }},
                    { loader: 'angular2-template-loader' },
                    { loader: 'angular-router-loader' }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'API_ROOT': JSON.stringify(METADATA.API_ROOT),
            'process.env': {
                'API_ROOT' : JSON.stringify(METADATA.API_ROOT)
            }
        })
    ],
    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    }
});
