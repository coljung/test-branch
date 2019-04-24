export default function getApiUrl(withApi = true) {
    // @TODO: I don't really like this.
    // toogle prefixing path with `/api`
    // eslint-disable-next-line no-undef
    return process.env.NODE_ENV === 'test' ?
        withApi ? `${process.env.GATEWAY_HOST}/api` : `${process.env.GATEWAY_PORT}` :
        withApi ? '/api' : '';
}
