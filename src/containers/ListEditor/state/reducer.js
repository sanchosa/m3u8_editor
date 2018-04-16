import {fromJS, Map, List} from 'immutable'
import {normalize} from 'normalizr'
import {channelListSchema} from './schema'
import {
	SET_NEW_LIST,
	SET_CONTROL,
	SORT_CHANNEL,
	SORT_GROUP,
	SET_LIST_NAME,
	CREATE_GROUP,
	DELETE_GROUP,
	EDIT_GROUP,
	initialState
} from './constants'

const moveListElement = (list, {oldIndex, newIndex}) => {
	if (oldIndex === newIndex || !list) return list

	const element = list.get(oldIndex)
	return list
		.splice(oldIndex, 1)
		.splice(newIndex, 0, element)
}

export default function listEditorReducer(state = initialState, action) {
	switch (action.type) {
	case SET_NEW_LIST: {
		const {channels, groups, playlistName} = action.payload
		const normalizedChannels = normalize(channels, channelListSchema).entities.channels
		return state.withMutations(map => map
			.set(`channels`, Map(normalizedChannels))
			.set(`groups`, fromJS(groups))
			.set(`playlistName`, playlistName))
	}
	case SET_CONTROL:
		return state.set(`control`, action.payload)
	case SORT_GROUP:
		return state.updateIn([`groups`, `index`], list => moveListElement(list, action.payload))
	case SORT_CHANNEL: {
		const group = action.payload.group
		return state.updateIn([`groups`, group], list => moveListElement(list, action.payload))
	}
	case SET_LIST_NAME:
		return state.set(`playlistName`, action.payload)
	case CREATE_GROUP:
		return state.withMutations(map => map
			.setIn([`groups`, `${action.payload}`], List())
			.updateIn([`groups`, `index`], index => index.push(action.payload))
		)
	case DELETE_GROUP: {
		return state.withMutations(map => map
			.deleteIn([`groups`, `${action.payload}`])
			.updateIn([`groups`, `index`], index => index.filter(group => group !== action.payload))
		)
	}
	case EDIT_GROUP: {
		const {current, newOne} = action.payload
		const channels = state.getIn([`groups`, `${current}`])
		const currentIndex = state.getIn([`groups`, `index`]).indexOf(current)
		return state.withMutations(map => map
			.deleteIn([`groups`, `${current}`])
			.setIn([`groups`, `${newOne}`], channels)
			.updateIn([`groups`, `index`], index => index.splice(currentIndex, 1, newOne))
		)
	}
	default:
		return state
	}
}