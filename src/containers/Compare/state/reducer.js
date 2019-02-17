import {
	initialState,
	DEFAULT_ACTION,
} from './constants'

function compareReducer(state = initialState, action) {
	switch (action.type) {
	case DEFAULT_ACTION:
		return state
	default:
		return state
	}
}

export default compareReducer
