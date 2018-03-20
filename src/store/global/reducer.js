import {
	SET_LOADING,
	SET_ERROR,
	SET_LOCALE,
	ErrorRecord,
	initialState
} from './constants'
import {LOCATION_CHANGE} from 'react-router-redux'

export default function appReducer(state = initialState, action) {
	switch (action.type) {
	case SET_ERROR: {
		return state.set(`error`, new ErrorRecord(action.payload))
	}
	case SET_LOADING: {
		return state.set(`loading`, action.payload)
	}
	case LOCATION_CHANGE: {
		return action.type === LOCATION_CHANGE
			? state.merge({location: action.payload})
			: state
	}
	case SET_LOCALE: {
		return state.set(`locale`, action.payload)
	}
	default: return state
	}
}
