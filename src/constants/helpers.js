
export default function getApiUrl() {
    return process.env.NODE_ENV === 'test' ? `${UI_HOST}/api` : '/api';
}
