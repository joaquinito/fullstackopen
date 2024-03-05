import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

/*
The createSlice function returns an object containing the reducer as well as the 
action creators defined by the reducers parameter. The reducer can be accessed by 
the noteSlice.reducer property, whereas the action creators by the noteSlice.actions property.

The createSlice function's name parameter defines the prefix which is used in the action's 
type values. For example, the createNote action defined later will have the type value of 
filter/setFilter. The initialState parameter defines the reducer's initial state. The reducers 
parameter takes the reducer itself as an object, of which functions handle state changes caused 
by certain actions.
*/
const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter(state, action) {
      return action.payload
    }
  }
})

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer