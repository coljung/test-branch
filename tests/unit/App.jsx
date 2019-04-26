/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import { expect } from 'chai';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { Provider } from 'react-redux';
import App from '../../src/App';

Enzyme.configure({ adapter: new Adapter() });

describe('Test the root of the app.', () => {
    it(`should mount and check.`, () => {
        const root = mount(<App />);
        // expect(root.find(Provider)).to.have.lengthOf(1);
    });
});
