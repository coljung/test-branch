module.exports = {
    server: {
        host: process.env.UI_HOST || 'localhost',
        port: process.env.UI_PORT || 8010,
        exposedHost: process.env.UI_EXPOSED_HOST || 'localhost',
        exposedPort: process.env.UI_EXPOSED_PORT || 8010,
    },
    auth: {
        enabled: true,
        user: process.env.HTTP_AUTH_USER || 'admin',
        password: process.env.HTTP_AUTH_PASSWORD || 'admin',
    },
    api: {
        gateway: {
            host: process.env.GATEWAY_HOST || 'localhost',
            port: process.env.GATEWAY_PORT || '3000',
        },
        gateway: {
            host: process.env.HQM_HOST || 'localhost',
            port: process.env.HQM_PORT || '9190',
        },
        auth: {
            enabled: process.env.AUTH_ENABLED === 'false' ? false : true,
            host: process.env.AUTH_HOST || 'dm-auth:8080',
            secure: process.env.AUTH_SERVER_SECURE === 'true' || false,
        },
    },
    node_env: {
        env: process.env.NODE_ENV || 'development',
    },
};
