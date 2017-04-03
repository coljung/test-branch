import React, { Component } from 'react';
import { Form, Input, Button, Icon } from 'antd';
const FormItem = Form.Item;

export default class Notes extends Component {
    constructor(props) {
        super(props);

        this.state = this.createState(props.content);
    }

    componentWillReceiveProps(props) {
        this.setState(this.createState(props.content));
    }

    createState(content) {
        if (!content || content.length === 0) {
            return { content: [{ text: '' }] };
        }

        return { content: content.slice() };
    }

    addNote() {
        const content = Array.from(this.state.content);
        content.push({ text: '' });

        this.onStateChange(content);
    }

    removeNote(index, e) {
        const content = Array.from(this.state.content);
        content.splice(index, 1);

        this.onStateChange(content);
    }

    onNoteChange(index, e) {
        const content = Array.from(this.state.content);
        content[index].text = e.target.value;

        this.onStateChange(content);
    }

    onStateChange(content) {
        this.setState({ content });
        if (this.props.onChange) {
            this.props.onChange(content);
        }
    }

    renderNotes() {
        return this.state.content.map((note, index) =>
            <div key={index} className="note-container">
                <Input
                    disabled={this.props.readOnly}
                    size="large"
                    addonAfter={this.renderDeleteButton(index)}
                    value={note.text}
                    placeholder={this.props.placeholder}
                    onChange={this.onNoteChange.bind(this, index)} />
            </div>,
        );
    }

    renderDeleteButton(index) {
        if (!this.props.readOnly) {
            return <Button onClick={this.removeNote.bind(this, index)}><Icon type="delete"/></Button>;
        }
        return null;
    }

    renderAddButton() {
        if (!this.props.readOnly) {
            return <Button onClick={this.addNote.bind(this)}><Icon type="plus-circle-o" /> Add another</Button>;
        }
        return null;
    }

    render() {
        return (
            <FormItem>
                {this.renderNotes()}

                <div className="note-add-button-container">
                    {this.renderAddButton()}
                </div>

            </FormItem>
        );
    }
}

Notes.propTypes = {
    readOnly: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    label: React.PropTypes.string.isRequired,
    placeholder: React.PropTypes.string.isRequired,
    content: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};

Notes.defaultProps = {
    readOnly: false,
};
