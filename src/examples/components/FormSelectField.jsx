import React from 'react';
import PropTypes from 'prop-types';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

// Style
// eslint-disable-next-line max-len
import dashboardStyle from '@ssense/ui-component-library/lib/assets/jss/material-dashboard-pro-react/views/dashboardStyle';

// core components
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

class PurchaseOrderAttributeSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            optionSelect: [],
        };
        this.handleOptionChange = this.handleOptionChange.bind(this);
    }

    handleOptionChange(event) {
        this.setState({ optionSelect: event.target.value });
    }

    render() {
        const { classes, options, title } = this.props;

        const menuItemClasses = {
            root: classes.selectMenuItem,
            selected: classes.selectMenuItemSelected,
        };

        const selectMenuProps = {
            className: classes.selectMenu,
        };

        const selectClasses = {
            // select: classes.select,
        };

        const inputSelectProps = {
            name: 'optionSelect',
            id: 'option-select',
        };

        return (
            <FormControl fullWidth className={classes.selectFormControl}>
                <InputLabel htmlFor="option-select" className={classes.selectLabel}>
                    {title}
                </InputLabel>
                <Select
                    MenuProps={selectMenuProps}
                    classes={selectClasses}
                    value={this.state.optionSelect}
                    onChange={this.handleOptionChange}
                    inputProps={inputSelectProps}>
                    {
                        options.map((option, index) => (
                            <MenuItem key={index} classes={menuItemClasses} value={index}>
                                {option}
                            </MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        );
    }
}

PurchaseOrderAttributeSelect.propTypes = {
    classes: PropTypes.object.isRequired,
    options: PropTypes.array,
    title: PropTypes.string.isRequired,
};

export default withStyles(dashboardStyle)(PurchaseOrderAttributeSelect);
