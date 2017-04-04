const path = require('path');
const webpack = require('webpack');
const config = require('config');

const base = require('./webpack.config');

const HOST = config.get('server.host');
const PORT = config.get('server.port')

base.entry.unshift(`webpack-dev-server/client?http://localhost:${PORT}`, 'webpack/hot/only-dev-server');

base.devServer = {
	historyApiFallback: true,
	inline: true,
	hot: true,
	host: HOST,
	port: 80,
	clientLogLevel: 'info',
	headers: { 'Access-Control-Allow-Origin': '*' },
    public: `localhost:${PORT}`,
    // for proxy, check https://github.com/Groupe-Atallah/ui-store/blob/v1/webpack.dev.config.js#L21
};

base.plugins.push(
	new webpack.HotModuleReplacementPlugin(),
    // eslint-disable-next-line comma-dangle
	new webpack.NoEmitOnErrorsPlugin()
);

module.exports = base;
