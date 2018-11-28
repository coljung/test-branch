import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18next';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

export default class ModalDialog extends React.Component {
    static propTypes = {
        title: PropTypes.string,
        buttonText: PropTypes.string.isRequired,
        children: PropTypes.node,
        onSave: PropTypes.func,
        saveButtonText: PropTypes.string,
        cancelButtonText: PropTypes.string,
    };

    state = {
        open: false,
    };

    handleClose = () => {
        this.setState({
            open: false,
        });
    };

    handleSave = () => {
        if (this.props.onSave) {
            this.props.onSave();
        }

        this.handleClose();
    };

    handleOpen = () => {
        this.setState({
            open: true,
        });
    };

    render() {
        return (
            <div>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>{this.props.title}</DialogTitle>
                    <DialogContent>
                        {this.props.children}
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleSave}>
                            {this.props.saveButtonText || i18n.t('modal.saveButton')}
                        </Button>
                        <Button variant="outlined" onClick={this.handleClose}>
                            {this.props.cancelButtonText || i18n.t('modal.cancelButton')}
                        </Button>
                    </DialogActions>
                </Dialog>
                <Button variant="contained" color="secondary" onClick={this.handleOpen}>
                    {this.props.buttonText}
                </Button>
            </div>
        );
    }
}
