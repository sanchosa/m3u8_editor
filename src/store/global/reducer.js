import {fromJS} from 'immutable'
import {
	SET_LOADING,
	SET_ERROR,
	SET_LOCALE,
	SET_STORAGE_FLAG,
	SET_STORAGE_INFO,
	ErrorRecord,
	initialState,
} from './constants'

export default function appReducer(state = initialState, action) {
	switch (action.type) {
	case SET_ERROR:
		return state.set(`error`, new ErrorRecord(action.payload))
	case SET_LOADING:
		return state.set(`loading`, action.payload)
	case SET_LOCALE:
		return state.set(`locale`, action.payload)
	case SET_STORAGE_FLAG:
		return state.set(`useStorage`, action.payload)
	case SET_STORAGE_INFO:
		return state.set(`storageInfo`, fromJS(action.payload))
	default: return state
	}
}
