import {fromJS} from 'immutable'
import {
	initialState,
	SET_VALUES,
} from './constants'
import {APPLY_COMPARE} from 'containers/ListEditor/state/constants'

export const setValues = (map, data) => {
	let result = map
	Object.keys(data).forEach(key => {
		result = result.set(key, fromJS(data[key]))
	})
	return result
}

function compareReducer(state = initialState, action) {
	switch (action.type) {
	case SET_VALUES:
		return state.withMutation(map => setValues(map, action.payload))
	case APPLY_COMPARE:
		return initialState
	default:
		return state
	}
}

export default compareReducer
