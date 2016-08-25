import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid/lib';
import { Button } from 'react-toolbox/lib/button';
import Tooltip from 'react-toolbox/lib/tooltip';
import { List } from 'react-toolbox/lib/list';
import Board from '../components/Board.jsx';
import Todo from './Todo.jsx'
import UpdateTodoDialog from './UpdateTodoDialog.jsx';
import CreateTodoDialog from './CreateTodoDialog.jsx';
import { createTodo, updateTodo, deleteTodo } from './todoActions.js';

const TooltipButton = Tooltip(Button);

class TodoContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      updateDialogActive: false,
      createDialogActive: false,
      activeTodo: {}
    };
  }
  
  updateDialogToggle(todo) {
    this.setState({
      updateDialogActive: !this.state.updateDialogActive,
      activeTodo: todo
    });
  }

  createDialogToggle() {
    this.setState({
      createDialogActive: !this.state.createDialogActive
    });
  }
 
  createTodo(todo) {
    this.props.dispatch(createTodo(todo));
    this.createDialogToggle();
  }

  updateTodo(todo) {
    this.props.dispatch(updateTodo(todo));
    this.updateDialogToggle();
  }

  deleteTodo(id) {
    console.log(id);
    this.props.dispatch(deleteTodo(id));
    this.updateDialogToggle();
  }
  
  render() {
    const createDialogActive = this.state.createDialogActive;
    const updateDialogActive = this.state.updateDialogActive;
    const activeTodo = this.state.activeTodo;
    const todos = this.props.todos;
    return (
      <div>
        <Row>
            <Col sm={12} md={6} lg={8} xsOffset={2}>
              <Board title={'Todo List'}>

                <List selectable ripple>
                  {todos.map((todo, key) =>
                    <Todo onClick={() => this.updateDialogToggle(todo)} key={key} todo={todo} />
                  )}
                </List>

                <div style={{padding:10, textAlign: 'right'}} >
                  <TooltipButton onClick={() => this.createDialogToggle()} icon='add' ripple floating primary tooltip='Create Todo' />
                </div>

              </Board>
            </Col>
        </Row>

        <UpdateTodoDialog
            active={updateDialogActive}
            onEscKeyDown={this.updateDialogToggle.bind(this)}
            onOverlayClick={this.updateDialogToggle.bind(this)}
            todo={activeTodo}
            updateTodo={this.updateTodo.bind(this)}
            deleteTodo={this.deleteTodo.bind(this)}
            title='Update' />

        <CreateTodoDialog
            active={createDialogActive}
            onEscKeyDown={this.createDialogToggle.bind(this)}
            onOverlayClick={this.createDialogToggle.bind(this)}
            createTodo={this.createTodo.bind(this)}
            title='Create' />
      </div>
    )
  }

}

function mapStateToProps(state) {
  const { todoReducer } = state;
  return {
    todos: todoReducer.todos
  }
}

export default connect(mapStateToProps)(TodoContainer);
