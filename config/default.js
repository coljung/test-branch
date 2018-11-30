module.exports = {
    server: {
        host: 'localhost',
        port: 8010,
        exposedHost: process.env.UI_HOST || 'localhost',
        exposedPort: process.env.UI_PORT || 8010,
    },
    node_env: {
        env: process.env.NODE_ENV || 'development',
    }
};
