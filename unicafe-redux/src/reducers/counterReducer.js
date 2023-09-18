
const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {

    // Action 'GOOD' will increment the good counter by 1 
    case 'GOOD':
      return {
        ...state,
        good: state.good + 1
      }

    // Action 'OK' will increment the ok counter by 1 
    case 'OK':
      return {
        ...state,
        ok: state.ok + 1
      }

    // Action 'BAD' will increment the bad counter by 1 
    case 'BAD':
      return {
        ...state,
        bad: state.bad + 1
      }

    // Action 'RESET' will reset all counters to 0
    case 'RESET':
      return {
        good: 0,
        ok: 0,
        bad: 0
      }

    default: return state
  }
}

export default counterReducer