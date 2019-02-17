import {fromJS, Map, List} from 'immutable'
import {normalize} from 'normalizr'
import randomString from 'randomstring'
import {channelListSchema, ChannelRecord} from './schema'
import {
	SET_NEW_LIST,
	SET_COMPARE_LIST,
	SET_CONTROL,
	SORT_CHANNEL,
	SORT_GROUP,
	SET_LIST_NAME,
	CREATE_GROUP,
	DELETE_GROUP,
	EDIT_GROUP,
	CREATE_CHANNEL,
	EDIT_CHANNEL,
	DELETE_CHANNEL,
	COPY_CHANNEL,
	MOVE_CHANNEL,
	LOAD_STORAGE_LIST,
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
	case SET_COMPARE_LIST: {
		const {channels: _channels, groups: _groups} = action.payload

		// console.log(_channels, _groups)

		const channels = state.get(`channels`)
		const groups = state.get(`groups`)

		const _links = _channels.map(channel => channel.link)

		const newChannels = _channels.filter(channel =>
			!channels.findEntry(value => value.get(`link`) === channel.link))
		const _ids = newChannels.map(channel => channel.id)
		const lostChannels = channels.filterNot(channel => _links.includes(channel.get(`link`)))

		const newGroups = {}
		for (let key in _groups) {
			const group = _groups[key]
			const result = group.filter(id => _ids.includes(id))

			if (result.length > 0) {
				newGroups[key] = result
			}
		}

		const lostGroups = groups
			.map(group => group
				.filter(id => lostChannels.has(id))
			)
			.filter(group => group.size > 0)

		const normalizedChannels = Map(normalize(newChannels, channelListSchema).entities.channels)

		return state.withMutations(map => map
			.setIn([`compare`, `newChannels`], normalizedChannels)
			.setIn([`compare`, `newGroups`], fromJS(newGroups))
			.setIn([`compare`, `lostChannels`], lostChannels)
			.setIn([`compare`, `lostGroups`], lostGroups)
			.setIn([`compare`, `visible`], normalizedChannels.size > 0 || lostChannels.size > 0)
		)
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
		const ids = state.getIn([`groups`, `${action.payload}`])
		return state.withMutations(map => map
			.deleteIn([`groups`, `${action.payload}`])
			.updateIn([`groups`, `index`], index => index.filter(group => group !== action.payload))
			.update(`channels`, channels => channels.deleteAll(ids))
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
	case CREATE_CHANNEL: {
		const {channel, group} = action.payload
		const id = randomString.generate()
		return state.withMutations(map => map
			.setIn([`channels`, `${id}`], new ChannelRecord({id, ...channel}))
			.updateIn([`groups`, `${group}`], channels => channels.push(id))
		)
	}
	case EDIT_CHANNEL: {
		const {channel, id} = action.payload
		return state.setIn([`channels`, `${id}`], new ChannelRecord({id, ...channel}))
	}
	case DELETE_CHANNEL: {
		const {ids, group} = action.payload
		return state.withMutations(map => map
			.updateIn([`groups`, `${group}`], list =>
				list.filter(value => !ids.includes(value)))
			.update(`channels`, channels => channels.deleteAll(ids))
		)
	}
	case COPY_CHANNEL: {
		const {ids, group} = action.payload
		return state.withMutations(map => {
			let result = map

			group && ids && ids.forEach(currentId => {
				const {id: unnecessary, ...channel} = map
					.getIn([`channels`, `${currentId}`])
					.toJS()
				const id = randomString.generate()
				result = result
					.setIn([`channels`, `${id}`], new ChannelRecord({id, ...channel}))
					.updateIn([`groups`, `${group}`], channels => channels.push(id))
			})

			return result
		})
	}
	case MOVE_CHANNEL: {
		const {ids, from, to} = action.payload
		return state.withMutations(map => map
			.updateIn([`groups`, `${to}`], group => group.push(...ids))
			.updateIn([`groups`, `${from}`], group => group
				.filter(value => !ids.includes(value))
			)
		)
	}
	case LOAD_STORAGE_LIST: {
		const {groups, channels, playlistName} = action.payload
		return state.withMutations(map => map
			.set(`playlistName`, playlistName || null)
			.set(`groups`, fromJS(groups))
			.set(`channels`, Map(channels)
				.map(channel => new ChannelRecord(channel))
			)
		)
	}
	default:
		return state
	}
}