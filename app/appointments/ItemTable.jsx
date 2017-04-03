import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Table, Icon } from 'antd';
import ItemSearch from './ItemSearch';
import { messages } from '../notifications/NotificationActions';

export class ItemTable extends Component {

    constructor(props) {
        super(props);

        this.state = this.createInitialState();
    }

    createInitialState() {
        return {
            showItemsModal: false,
            store_id: null,
            items: [],
        };
    }

    componentWillReceiveProps(props) {
        this.setState({ items: props.items, store_id: props.store_id });
    }

    showItemsModal() {
        this.setState({ showItemsModal: true });
    }

    hideItemsModal() {
        this.setState({ showItemsModal: false });
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
                render: (text, item) => (
                    <a key={item.id} href="#" onClick={this.removeItem.bind(this, item.sku)} >Remove</a>
                ),
            },
        ];
    }

    removeItem(sku) {
        const index = this.state.items.findIndex(item => item.sku === sku);
        this.state.items.splice(index, 1);
        if (index > -1) {
            this.setState({ items: this.state.items });
            this.props.onItemsChange(this.state.items);
        }
    }

    onAddItem(item) {
        this.state.items.push(item);
        this.setState({ items: this.state.items });
        this.props.onItemsChange(this.state.items);
        this.props.messages({ content: 'The item has been added.' });
    }

    renderImage(value) {
        return {
            children: (
                <img height={ 40 } src={value[0].replace('__IMAGE_PARAMS__/', 'b_white,c_lpad,g_south,h_40,w_40/c_scale,h_40/v550/')} />
            ),
            props: {},
        };
    }

    renderPrice(value) {
        return {
            children: (
                <p>{value.full_format.replace('%s', value.regular)}</p>
            ),
            props: {},
        };
    }

    render() {
        return (
            <div>
                <Button onClick={this.showItemsModal.bind(this)}><Icon type="plus-circle-o" /> Add Items</Button>
                <br/><br/>
                <Table
                    size='middle'
                    columns={this.getTableColumns()}
                    dataSource={this.state.items}
                />

                <ItemSearch visible={this.state.showItemsModal}
                            onCancel={this.hideItemsModal.bind(this)}
                            onAddItem={this.onAddItem.bind(this)}
                            store_id={this.state.store_id}
                />
            </div>
        );
    }
}

function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ messages }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemTable);
