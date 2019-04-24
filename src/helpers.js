
export default function getApiUrl() {
    return process.env.NODE_ENV === 'test' ? `${process.env.GATEWAY_HOST}/api` : '/api';
}
