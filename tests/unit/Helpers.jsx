
import getApiUrl from '../../src/helpers';

describe('Helpers functions', () => {
    it('should get the API URL', () => expect(getApiUrl()).toEqual('http://127.0.0.1/api'));
});
