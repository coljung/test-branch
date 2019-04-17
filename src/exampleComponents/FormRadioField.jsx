import React from 'react';
import PropTypes from 'prop-types';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import dashboardStyle from '@ssense/ui-component-library/lib/assets/jss/material-dashboard-pro-react/views/dashboardStyle';

// core components
import {
    FormControl,
    FormLabel,
    FormControlLabel,
    RadioGroup,
    Radio,
} from '@material-ui/core';

class PurchaseOrderAttributeRadio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            optionSelect: []
        };
        this.handleOptionChange = this.handleOptionChange.bind(this);
    }

    handleOptionChange(event) {
        this.setState({ optionSelect: event.target.value });
    }

    render() {
        const { classes, options, title } = this.props;

        const styles = () => ({
            group: {
                display: 'block',
            },
        });

        const optionMenuItems = options.map((option, index) => (
            <FormControlLabel
                value={option}
                control={<Radio />}
                key={index}
                label={option}
            />
        ));

        return (
            <FormControl>
                <FormLabel>{title}</FormLabel>
                <RadioGroup row>{optionMenuItems}</RadioGroup>
            </FormControl>
        );
    }
}

PurchaseOrderAttributeRadio.propTypes = {
    classes: PropTypes.object.isRequired,
    options: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
};

export default withStyles(dashboardStyle)(PurchaseOrderAttributeRadio);
