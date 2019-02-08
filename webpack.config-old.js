/* eslint-disable import/no-commonjs, import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const chalk = require('chalk');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const config = require('config');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: __dirname,
    devtool: 'inline-source-map',
    entry: [
        'react-hot-loader/patch',
        './src/index.jsx',
    ],
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    resolve: {
        extensions: ['.scss', '.css', '.js', '.jsx', '.json', '.less'],
        modules: [
            path.join(__dirname, './src'),
            'node_modules',
        ],
        alias: {
            notifications: path.join(__dirname, './src/notifications/'),
        },
    },
    module: {
        rules: [
            {
                test: /(\.js|\.jsx)$/,
                exclude: /(node_modules)/,
                use: ['babel-loader'],
            },
            {
                test: /(\.css)$/,
                use: ExtractTextPlugin.extract({
                    fallback: [{
                        loader: 'style-loader',
                    }],
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true,
                            },
                        },
                    ],
                }),
            },
            {
                test: /(\.less)$/,
                use: ExtractTextPlugin.extract({
                    fallback: [{
                        loader: 'style-loader',
                    }],
                    use: [
                        'css-loader',
                        {
                            loader: 'less-loader',
                            options: {
                            },
                        },
                    ],
                }),
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=50000&name=[path][name].[ext]',
            },
        ],
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'styles.css',
            allChunks: true,
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(config.get('node_env.env')),
                UI_HOST: JSON.stringify(config.get('server.exposedHost')),
                UI_PORT: JSON.stringify(config.get('server.exposedPort')),
            },
            UI_HOST: JSON.stringify(config.get('server.exposedHost')),
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                context: __dirname,
                postcss: [autoprefixer],
            },
        }),
        new Visualizer({
            filename: './webpackBundleStats.html',
        }),
        new ProgressBarPlugin({
            format: `${chalk.blue.bold(' build [:bar] ')}${chalk.magenta.bold(':percent')} (:elapsed seconds)`,
            clear: false,
            width: 50,
        }),
        new HtmlWebpackPlugin({
            hash: true,
            template: path.join(__dirname, 'public', 'index.html'),
            inject: true,
        }),
    ],
};
