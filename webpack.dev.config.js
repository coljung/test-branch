const path = require('path');
const webpack = require('webpack');
const config = require('config');

const base = require('./webpack.config');

base.entry.unshift('webpack-dev-server/client?http://localhost:4003', 'webpack/hot/only-dev-server');

base.devServer = {
	historyApiFallback: true,
	inline: true,
	hot: true,
	host: '0.0.0.0',
	port: 80,
	clientLogLevel: 'info',
	headers: { 'Access-Control-Allow-Origin': '*' },
    public: 'localhost:4003',
    // for proxy, check https://github.com/Groupe-Atallah/ui-store/blob/v1/webpack.dev.config.js#L21
};

base.plugins.push(
	new webpack.HotModuleReplacementPlugin(),
    // eslint-disable-next-line comma-dangle
	new webpack.NoEmitOnErrorsPlugin()
);

module.exports = base;
