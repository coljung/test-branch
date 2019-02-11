module.exports = {
    server: {
        host: process.env.UI_HOST || '0.0.0.0',
        port: process.env.UI_HOST || 8010,
        exposedHost: process.env.UI_HOST || '0.0.0.0',
        exposedPort: process.env.UI_PORT || 8010,
    },
    node_env: {
        env: process.env.NODE_ENV || 'development',
    }
};
