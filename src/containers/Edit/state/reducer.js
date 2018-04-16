// import {fromJS} from 'immutable'
import {SET_VALUE, initialState} from './constants'
import {DELETE_GROUP, EDIT_GROUP} from 'containers/ListEditor/state/constants'

function editReducer(state = initialState, action) {
	switch (action.type) {
	case SET_VALUE: {
		const {name, value} = action.payload
		return state.set(name, value)
	}
	case EDIT_GROUP:
		const {current, newOne} = action.payload
		return state.withMutations(map => map
			.update(`leftGroup`, group => group === current ? newOne : group)
			.update(`rightGroup`, group => group === current ? newOne : group)
		)
	case DELETE_GROUP: {
		const value = action.payload
		return state.withMutations(map => map
			.update(`leftGroup`, group => group === value ? undefined : group)
			.update(`rightGroup`, group => group === value ? undefined : group)
		)
	}
	default:
		return state
	}
}

export default editReducer
