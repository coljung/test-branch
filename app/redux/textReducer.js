import { ADD_TEXT } from './actions.js'; 

const initialState = {
  textCollection: []
}

const textCollection = (state = initialState, action) => {
  switch (action.type) {
    
    case ADD_TEXT:
      return Object.assign({}, state, {
        todos: [
          ...state.textCollection,
          {
            text: action.text
          }
        ]
      })
    
    default:
      return state
  }
}

export default textCollection;