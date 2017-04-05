import React, { Component } from 'react';

export default class Todo extends Component {
    render() {
        const bgColor = this.props.todo.completed ? '#d6ffd3' : '#ffffff';
        return (

        <li style={{ backgroundColor: bgColor }} onClick={this.props.onClick}>
            <p>{this.props.todo.title}gg</p>
            <p>{this.props.todo.completed}</p>
            <p>{this.props.todo.text}</p>
        </li>
        );
    }

}
