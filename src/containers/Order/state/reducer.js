import {
	SET_GROUP,
	initialState
} from './constants'
import {LOAD_NEW_LIST} from 'containers/ListEditor/state/constants'

export default function orderReducer(state = initialState, action) {
	switch (action.type) {
	case LOAD_NEW_LIST:
		return initialState
	case SET_GROUP: {
		return state.set(`group`, action.payload)
	}
	default: return state
	}
}