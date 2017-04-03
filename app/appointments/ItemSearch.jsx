import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal, Input, Table } from 'antd';
import { getItemsBySku, refreshItemsSearch } from './AppointmentActions';

const Search = Input.Search;

export class ItemSearch extends Component {

    constructor(props) {
        super(props);
        this.state = this.createInitialState();
    }

    createInitialState() {
        return {
            items: [],
        };
    }

    componentWillReceiveProps(props) {
        if (props.items) {
            this.setState({ items: props.items });
        }
    }

    getTableColumns() {
        return [
            { title: 'Image', dataIndex: 'images', key: 'images', render: this.renderImage },
            { title: 'Sku', dataIndex: 'sku', key: 'sku' },
            { title: 'Name', dataIndex: 'name', key: 'name' },
            { title: 'Size', dataIndex: 'size', key: 'size' },
            { title: 'Price', dataIndex: 'price', key: 'price', render: this.renderPrice },
            {
                title: 'Action',
                dataIndex: 'action',
                key: 'action',
                render: (text, item) => {
                    const obj = {
                        children: <a href="#" onClick={this.onAddItem.bind(this, item)}>Add</a>,
                        props: {},
                    };

                    if (this.state.items.length === 0) {
                        obj.props.colSpan = 0;
                    }
                    return obj;
                },
            },
        ];
    }

    getTableData() {
        return this.state.items;
    }

    onAddItem(item) {
        this.props.onAddItem(item);
    }

    onClickSearch(value) {
        this.props.getItemsBySku(value, this.props.currentStoreId);
    }

    onCancelClick() {
        this.props.refreshItemsSearch();
        this.props.onCancel();
    }

    renderPrice(value) {
        return {
            children: (
                <p>{value.full_format.replace('%s', value.regular)}</p>
            ),
            props: {},
        };
    }

    renderImage(value) {
        return {
            children: (
                <img height={ 40 } src={value[0].replace('__IMAGE_PARAMS__/', 'b_white,c_lpad,g_south,h_40,w_40/c_scale,h_40/v550/')} />
            ),
            props: {},
        };
    }

    render() {
        return (
            <Modal title="Add Items to an appointment"
                   visible={this.props.visible}
                   onCancel={this.onCancelClick.bind(this)}
                   cancelText="Close"
                   onOk={this.onCancelClick.bind(this)}
                   width={ 1000 }
            >
                <Search
                    placeholder="input search sku"
                    style={{ width: 200 }}
                    onSearch={this.onClickSearch.bind(this)}
                />

                <br/><br/>

                <Table size="small" columns={this.getTableColumns()} dataSource={this.getTableData()} pagination={false} />

            </Modal>
        );
    }
}

function mapStateToProps(state) {
    return {
        items: state.AppointmentReducer.items,
        currentStoreId: state.StoreReducer.currentStoreId,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getItemsBySku, refreshItemsSearch }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemSearch);

ItemSearch.propTypes = {
    onCancel: React.PropTypes.func.isRequired,
    onAddItem: React.PropTypes.func.isRequired,
};
