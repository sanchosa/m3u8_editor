// import {fromJS} from 'immutable'
import {SET_VALUE, initialState} from './constants'

function editReducer(state = initialState, action) {
	switch (action.type) {
	case SET_VALUE:
		const {name, value} = action.payload
		return state.set(name, value)
	default:
		return state
	}
}

export default editReducer
