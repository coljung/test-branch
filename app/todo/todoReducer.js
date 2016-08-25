import { ADD_TODO, UPDATE_TODO, DELETE_TODO } from './todoActions.js';

const initialState = {
  todos: [
    {
      id: 1,
      title: 'Todo 1',
      text: 'Something that I need to do.',
      completed: false
    },
    {
      id: 2,
      title: 'Todo 2',
      text: 'Some other thing that I need to do.',
      completed: false
    },
    {
      id: 3,
      title: 'Todo 3',
      text: 'A third thing that that I need to do.',
      completed: true
    }
  ]
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
        console.log(action);
      return Object.assign({}, state, {
          todos: [
            ...state.todos,
            {
                id: fetchLatestId(state.todos),
                title: action.todo.title,
                text: action.todo.text,
                completed: action.todo.completed
            }
          ]
      })

    case UPDATE_TODO:
      let updateList = [];
      state.todos.map(todo =>
        updateList.push(updateTodo(todo, action.todo))
      )
      return Object.assign({}, state, {
        todos: updateList
      });

    case DELETE_TODO:
      const deleteList = [];
      state.todos.map(todo => {
        if(todo.id !== action.id) {
          deleteList.push(todo)
        }
      })
      return Object.assign({}, state, {
        todos: deleteList
      });
      
    default:
      return state
  }
}

const updateTodo = (currentTodo, newTodo) => {
  if (currentTodo.id !== newTodo.id) {
    return currentTodo;
  } else {
    return {
      id: currentTodo.id,
      title: newTodo.title,
      text: newTodo.text,
      completed: newTodo.completed
    }
  }
};

const fetchLatestId = (todos) => {
  let currId = 0;
  todos.map((todo) => {
    if(todo.id > currId) {
      currId = todo.id;
    }
  });
  return currId + 1;
}

export default todoReducer
