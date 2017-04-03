module.exports = {
    server: {
        host: 'localhost',
        port: 9997,
        exposedHost: 'localhost',
        exposedPort: 9997
    },
    api: {
        store: {
            host: 'ms_store',
            port: 9996
        },
        product: {
            host: 'ms_product',
            port: 9995
        }
    },
    auth: {
        password: 'secret'
    }
};
