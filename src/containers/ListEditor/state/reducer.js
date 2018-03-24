import {fromJS} from 'immutable'
import {
	SET_NEW_LIST,
	SET_CONTROL,
	initialState
} from './constants'

export default function listEditorReducer(state = initialState, action) {
	switch (action.type) {
	case SET_NEW_LIST:
		const {channels, groups, playlistName} = action.payload
		return state.withMutations(map => map
			.set(`channels`, fromJS(channels))
			.set(`groups`, fromJS(groups))
			.set(`playlistName`, playlistName))
	case SET_CONTROL:
		return state.set(`control`, action.payload)
	default:
		return state
	}
}