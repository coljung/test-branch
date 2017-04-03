import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { Input, Form } from 'antd';
import { getFittingRoomDetail, saveFittingRoom, clearFittingRoomState } from './FittingRoomActions';
import { ROUTE_FITTING_ROOM_LIST } from '../Routes';
import BaseForm from '../components/BaseForm';

export class FittingRoomForm extends Component {

    componentDidMount() {
        this.props.clearFittingRoomState();

        this.editMode = (this.props.params.id !== 'new');
        if (this.editMode) {
            this.props.getFittingRoomDetail(this.props.params.id);
        }
    }

    componentWillReceiveProps(props) {
        if (props.fittingRoom) {
            if (!this.editMode) {
                browserHistory.push(`${ROUTE_FITTING_ROOM_LIST}/${props.fittingRoom.id}`);
            } else {
                this.setState({ name: props.fittingRoom.name });
            }
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const { validateFields, getFieldValue } = this.props.form;

        validateFields(['name'], (error) => {
            if (!error) {
                this.props.saveFittingRoom({
                    id: (this.editMode ? this.props.params.id : null),
                    name: getFieldValue('name'),
                    store_id: this.props.currentStoreId,
                });
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const title = `${this.editMode ? 'Edit' : 'Create'} Fitting Room`;

        return (
            <BaseForm title={title} onSaveClick={this.handleSubmit.bind(this)} onCancelClick={browserHistory.push.bind(this, ROUTE_FITTING_ROOM_LIST)}>
                <Form.Item label='Name' labelCol={{ span: 3 }} wrapperCol={{ span: 9 }}>
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: '"Name" is a required field' }],
                        initialValue: this.state ? this.state.name : null,
                    })(
                        <Input id='name' />,
                    )}
                </Form.Item>
            </BaseForm>
        );
    }
}

function mapStateToProps(state) {
    return {
        fittingRoom: state.FittingRoomReducer.fittingRoom,
        currentStoreId: state.StoreReducer.currentStoreId,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getFittingRoomDetail, saveFittingRoom, clearFittingRoomState }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(FittingRoomForm));
