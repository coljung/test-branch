import React, { Component } from 'react';
import { Select, Form } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

export default class DataSelector extends Component {
    constructor(props) {
        super(props);
        this.state = this.createState(props);
    }

    componentWillReceiveProps(props) {
        this.setState(this.createState(props));
    }

    createState(props) {
        return { dataList: props.dataList, default: props.dataList.length > 0 ? props.default : '' };
    }

    onChange(value) {
        this.props.onChange(value);
        this.setState({ default: value });
    }

    render() {
        const list = this.state.dataList.map((one, index) =>
            <Option
                key={`${index}`}
                value={`${one[this.props.valueField]}`}>{one[this.props.descriptionField]}
            </Option>,
        );

        return (
            <FormItem label={this.props.label} labelCol={{ span: 9 }} wrapperCol={{ span: 12 }}>
                <Select
                    value={`${this.state.default}`}
                    onChange={this.onChange.bind(this)}
                    style={{ width: '100%' }}>
                    {list}
                </Select>
            </FormItem>
        );
    }
}

DataSelector.propTypes = {
    onChange: React.PropTypes.func.isRequired,
    default: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
    ]).isRequired,
    dataList: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    label: React.PropTypes.string.isRequired,
    valueField: React.PropTypes.string,
    descriptionField: React.PropTypes.string,
};

DataSelector.defaultProps = {
    valueField: 'id',
    descriptionField: 'name',
};
