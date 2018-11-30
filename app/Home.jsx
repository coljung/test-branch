import React from 'react';
import PropTypes from 'prop-types';
import RegularButton from './dashboard/components/CustomButtons/Button';

export default class Home extends React.Component {
    render() {
        return (
            <div>
                Allo
                <RegularButton>Btn</RegularButton>
            </div>
        );
    }
}
