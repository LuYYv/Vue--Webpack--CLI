const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const app_config = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../config.json')).toString()).DEV;
const { LISTEN_PORT = 3000, BACKEND, TITLE } = app_config;

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, '../src/index.js'),
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.js'
        },
        mainFiles: [
            'index.js'
        ]
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        historyApiFallback: true,
        inline: true,  //自动刷新
        port: LISTEN_PORT,
        proxy: {

        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                loader: 'vue-loader',
            },
            {
                test: /\.(css|scss)$/,
                loader: ExtractTextPlugin.extract({ use: ["css-loader", "sass-loader"] })
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract({
                    use: [
                        { loader: 'css-loader' },
                        { loader: 'less-loader', options: { javascriptEnabled: true } },
                        {
                            loader: 'style-resources-loader',
                            options: {
                                // patterns: path.resolve(__dirname, './src/Style/common.less')   //如果需要用一个入口less引入其他的less文件， 开启这一行
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192
                }
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('style.css'),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../index.html'),
            title: TITLE,
            filename: 'index.html',
            inject: true
        })
    ]
}
