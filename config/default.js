module.exports = {
    server: {
        host: process.env.UI_HOST || 'localhost',
        port: process.env.UI_PORT || 8010,
        exposedHost: process.env.UI_EXPOSED_HOST || 'localhost',
        exposedPort: process.env.UI_EXPOSED_PORT || 8010,
    },
    node_env: {
        env: process.env.NODE_ENV || 'development',
    }
};
