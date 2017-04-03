import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Table, Button, Modal } from 'antd';
import { getStores, setCurrentStore } from './StoreActions';
import { ROUTE_STORE_LIST } from '../Routes';

export class SelectStoreModal extends Component {
    componentWillMount() {
        this.state = {
            stores: [],
            visible: localStorage.getItem('currentStore') === null,
        };
        this.props.getStores(-1);
    }

    componentWillReceiveProps(props) {
        this.setState({
            stores: props.stores,
        });
    }

    getColumns() {
        return [
            { title: 'Store Name', dataIndex: 'name', key: 'name' },
            {
                title: 'Actions',
                key: 'action',
                render: record => (
                    <Button size='large'
                            icon='select'
                            type='primary'
                            onClick={this.props.setCurrentStore.bind(this, record)}>Select</Button>
                ),
            },
        ];
    }

    render() {
        const storeView = this.state.stores.length ?
            <Table rowKey={record => record.id}
                   columns={this.getColumns()}
                   dataSource={this.state.stores}
                   pagination={{ pageSize: 5 }}
                   locale={{ emptyText: 'No Stores Found' }}/> :
            <div style={{ textAlign: 'center' }}>
                <Button size='large'
                        icon='create'
                        type='primary'
                        onClick={() => {
                            browserHistory.push(`${ROUTE_STORE_LIST}/new`);
                            this.props.onHideStoreModal();
                        } }>Create new Store</Button>
            </div>;

        return (
            <Modal
                key={1}
                visible={this.state.visible}
                width={500}
                title='Select your store'
                closable={false}
                footer={null}>
                {storeView}
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    return {
        stores: state.StoreReducer.stores.collection || [],
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getStores, setCurrentStore }, dispatch);
}

SelectStoreModal.propTypes = {
    onHideStoreModal: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectStoreModal);
