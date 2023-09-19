// Action creator for the 'SET_FILTER' action
export const setFilter = (content) => {
  return {
    type: 'SET_FILTER',
    payload: content
  }
}

const filterReducer = (state, action) => {
  console.log('state: ', state)

  switch (action.type) {

    // Action 'SET_FILTER' will set the string that will be used to filter the anecdotes
    case "SET_FILTER": {
      console.log('action.payload', action.payload)
      return action.payload
    }

    default: {
      return ''
    }
  }
}

export default filterReducer