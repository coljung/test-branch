import React from 'react';
import { Button, Form, Popconfirm, Row, Col } from 'antd';
import Board from '../components/Board';

export default class BaseForm extends React.Component {
    render() {
        let deleteButton = null;
        if (this.props.onDeleteClick) {
            deleteButton = (
                <Popconfirm
                    title='Are you sure?'
                    onConfirm={this.props.onDeleteClick}>
                    <Button icon='delete' className='ant-btn-xl' type='danger' style={{ float: 'right' }}>Delete</Button>
                </Popconfirm>
            );
        }

        return (
            <Board title={this.props.title}>
                <Form>
                    {this.props.children}

                    {this.props.showButtons === true ? (
                        <Row className="formButtonBox">
                            <Col span={12} push={3}>
                                <Button onClick={this.props.onSaveClick}
                                        type='primary'
                                        className='ant-btn-xl'
                                        icon='save'
                                        disabled={ this.props.hasErrors ? this.props.hasErrors() : false }>Save</Button>
                                <Button onClick={this.props.onCancelClick}
                                        className='ant-btn-xl'
                                        icon='arrow-left'>
                                    Back
                                </Button>
                            </Col>
                            <Col span={4} push={8}>
                                {deleteButton}
                            </Col>
                        </Row>
                    ) : null}
                </Form>
            </Board>
        );
    }
}

BaseForm.propTypes = {
    onSaveClick: React.PropTypes.func.isRequired,
    onCancelClick: React.PropTypes.func.isRequired,
    title: React.PropTypes.string.isRequired,
    children: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.element),
        React.PropTypes.element,
    ]).isRequired,
    onDeleteClick: React.PropTypes.func,
};

BaseForm.defaultProps = {
    showButtons: true,
};
