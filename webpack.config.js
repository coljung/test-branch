const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('config');

const theme = './app/styles/theme.js';

module.exports = {
	context: __dirname,
	devtool: 'inline-source-map',
	entry: [
		'./app/index.jsx',
	],
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'bundle.js',
		publicPath: '/',
	},
	resolve: {
		extensions: ['.scss', '.css', '.js', '.jsx', '.json', '.less'],
	},
	module: {
		rules: [
			{
				test: /(\.js|\.jsx)$/,
				exclude: /(node_modules)/,
                use: ['react-hot-loader', 'babel-loader'],
			},
			{
				test: /(\.css)$/,
				use: ExtractTextPlugin.extract({
                    fallback: [{
                        loader: 'style-loader',
                    }],
                    use: [
                        'css-loader',
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
                        'less-loader',
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
                MS_STORE_HOST: JSON.stringify(config.get('api.store.host')),
                MS_STORE_PORT: JSON.stringify(config.get('api.store.port')),
                MS_PRODUCT_HOST: JSON.stringify(config.get('api.product.host')),
                MS_PRODUCT_PORT: JSON.stringify(config.get('api.product.port')),
                UI_STORE_HOST: JSON.stringify(config.get('server.exposedHost')),
                UI_STORE_PORT: JSON.stringify(config.get('server.exposedPort')),
                NODE_ENV: JSON.stringify(config.get('node_env.env')),
			},
		}),
        new webpack.LoaderOptionsPlugin({
            options: {
                context: __dirname,
                postcss: [autoprefixer],
            },
        }),
    ],
};
