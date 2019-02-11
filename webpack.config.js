const path = require('path');
const config = require('config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = require('config');

const host = config.get('server.host');
const port = config.get('server.port');
const exposedPort = config.get('server.exposedPort');


module.exports = {
    entry: path.join(__dirname, 'src', 'index.jsx'),
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
    },
    mode: process.env.NODE_ENV || 'development',
    resolve: {
        extensions: ['.scss', '.css', '.js', '.jsx', '.json'],
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
    devServer: {
        host: config.get('server.host'),
        port: config.get('server.port'),
        headers: { 'Access-Control-Allow-Origin': '*' },
        public: `${config.get('server.exposedHost')}:${config.get('server.exposedPort')}`,
        publicPath: '/',
        disableHostCheck: true,
        allowedHosts: [
            '0.0.0.0',
            'localhost',
            'DOMAIN',
            '*.DOMAIN',
        ],
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
    ],
};
