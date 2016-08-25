import React, { Component } from 'react';
import { ListItem } from 'react-toolbox/lib/list';

export default class Todo extends Component {
  render() {
    const bgColor = this.props.todo.completed ? '#d6ffd3' : '#ffffff';
    return (
      <ListItem ripple 
        style={{backgroundColor: bgColor}}
        caption={this.props.todo.title}
        checked={this.props.todo.completed}
        legend={this.props.todo.text}
        onClick={this.props.onClick}
      />
    )
  }

}
