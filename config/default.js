// dummy host
const dummyHost = 'localhost';
const dummyPort = '8003';
const dummyEnv = 'development';

module.exports = {
    server: {
        host: dummyHost,
        port: dummyPort,
        // exposedHost: process.env.UI_STORE_HOST,
        // exposedPort: process.env.UI_STORE_PORT
    },
    node_env: {
        env: process.env.NODE_ENV || dummyEnv,
    }
};
