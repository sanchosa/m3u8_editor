import {fromJS} from 'immutable'
import {
	SET_NEW_LIST,
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
	default:
		return state
	}
}