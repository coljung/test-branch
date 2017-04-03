const path = require('path');
const express = require('express');
const cors = require('cors');
const webpack = require('webpack');
const config = require('config');
const webpackConfig = require('./webpack.config');
const request = require('request');
const basicAuth = require('node-basicauth');


const host = config.get('server.host');
const port = config.get('server.port');
const apiStoreBaseUrl = `http://${config.get('api.store.host')}:${config.get('api.store.port')}`;
const apiProductBaseUrl = `http://${config.get('api.product.host')}:${config.get('api.product.port')}`;

const app = express();

app.use(basicAuth({
    admin: config.get('auth.password'),
}));

app.use(cors());
app.use(express.static(path.resolve(__dirname, 'build')));
app.use(express.static(path.resolve(__dirname, 'public')));

app.all('/api/products/*', (req, res) => {
    const uri = req.originalUrl.replace(/^\/api\/products\//, '/');
    const apiRequest = request(apiProductBaseUrl + uri);
    req.pipe(apiRequest);
    apiRequest.pipe(res);
});

app.all('/api/*', (req, res) => {
    const uri = req.originalUrl.replace(/^\/api\//, '/');
    const apiRequest = request(apiStoreBaseUrl + uri);
    req.pipe(apiRequest);
    apiRequest.pipe(res);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(port, host, (err) => {
    if (err) {
        // eslint-disable-next-line no-console
        console.log(err);
        return;
    }

    // eslint-disable-next-line no-console
    console.log(`Listening at http://${host}:${port}`);
});
