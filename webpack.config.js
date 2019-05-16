/* eslint-disable import/no-commonjs, import/no-extraneous-dependencies */
const path = require('path');
const config = require('config');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const host = config.get('server.host');
const port = config.get('server.port');
const exposedPort = config.get('server.exposedPort');
const exposedHost = config.get('server.exposedHost');


const fs = require('fs');

// absolute paths to all symlinked modules inside `nodeModulesPath`
// adapted from https://github.com/webpack/webpack/issues/811#issuecomment-405199263

module.exports = {
    entry: path.join(__dirname, 'src', 'index.jsx'),
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
    },
    mode: process.env.NODE_ENV || 'development',
    resolve: {
        alias: {
            //not working
          ssenseComponents: path.resolve(__dirname, 'node_modules/@ssense/ui-component-library/lib/'),
        },
        symlinks: false,
        extensions: ['.scss', '.css', '.js', '.jsx', '.json'],
        modules: [
            path.resolve(__dirname, 'src'),
            'node_modules',
        ],
    },
    devServer: {
        host,
        port,
        hot: true,
        public: `${exposedHost}:${exposedPort}`,
        publicPath: '/',
        clientLogLevel: 'info',
        historyApiFallback: true,
        contentBase: path.join(__dirname, 'src'),
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
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true,
                        },
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            modules: true,
                            localIdentName: '[local]___[hash:base64:5]',
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=50000&name=[path][name].[ext]',
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public', 'index.html'),
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(config.get('node_env.env')),
                UI_HOST: JSON.stringify(config.get('server.exposedHost')),
                UI_PORT: JSON.stringify(config.get('server.exposedPort')),
                MS_HOST: JSON.stringify(config.get('api.gateway.host')),
                MS_PORT: JSON.stringify(config.get('api.gateway.port')),
            },
            UI_HOST: JSON.stringify(config.get('server.exposedHost')),
        }),
    ],
    watchOptions: {
        ignored: /node_modules\/(?!@ssense)/,
    },
};
