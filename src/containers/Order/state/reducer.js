import {SET_GROUP, initialState} from './constants'

export default function orderReducer(state = initialState, action) {
	switch (action.type) {
	case SET_GROUP: {
		return state.set(`group`, action.payload)
	}
	default: return state
	}
}