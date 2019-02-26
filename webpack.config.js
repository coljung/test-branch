const path = require('path');
const config = require('config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const host = config.get('server.host');
const port = config.get('server.port');
const exposedPort = config.get('server.exposedPort');
const exposedHost = config.get('server.exposedHost');


const fs = require('fs');

// absolute paths to all symlinked modules inside `nodeModulesPath`
// adapted from https://github.com/webpack/webpack/issues/811#issuecomment-405199263
module.exports = function findLinkedModules(nodeModulesPath) {
  const modules = []

  fs.readdirSync(nodeModulesPath).forEach(dirname => {
    const modulePath = path.resolve(nodeModulesPath, dirname)
    const stat = fs.lstatSync(modulePath)

    if (dirname.startsWith('.')) {
      // not a module or scope, ignore
    } else if (dirname.startsWith('@')) {
      // scoped modules
      modules.push(...findLinkedModules(modulePath))
    } else if (stat.isSymbolicLink()) {
      const realPath = fs.realpathSync(modulePath)
      const realModulePath = path.resolve(realPath, 'node_modules')

      modules.push(realModulePath)
    }
  })

  return modules
}


module.exports = {
    entry: path.join(__dirname, 'src', 'index.jsx'),
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
    },
    mode: process.env.NODE_ENV || 'development',
    resolve: {
        symlinks: false,
        extensions: ['.scss', '.css', '.js', '.jsx', '.json'],
        modules: [
            path.resolve(__dirname, 'src'),
            'node_modules',
            // ...findLinkedModules(path.resolve('node_modules')),
        ],
    },
    devServer: {
        host,
        port,
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
    ],
};
