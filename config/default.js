module.exports = {
    server: {
        host: "0.0.0.0",
        port: 80,
        exposedHost: process.env.UI_STORE_HOST,
        exposedPort: process.env.UI_STORE_PORT
    },
    api: {
        store: {
            host: process.env.MS_STORE_HOST,
            port: process.env.MS_STORE_PORT,
        },
        product: {
            host: process.env.MS_PRODUCT_HOST,
            port: process.env.MS_PRODUCT_PORT,
        }
    },
    auth: {
        password: process.env.HTTP_AUTH_PASSWORD,
    },
    node_env: {
        env: process.env.NODE_ENV,
    }
};
