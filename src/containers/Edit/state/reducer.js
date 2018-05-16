import {SET_VALUE, initialState} from './constants'
import {DELETE_GROUP, EDIT_GROUP} from 'containers/ListEditor/state/constants'
import {DELETE_CHANNEL, MOVE_CHANNEL} from 'containers/ListEditor/state/constants'

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
			.set(`rightChannel`, null)
		)
	}
	case MOVE_CHANNEL:
	case DELETE_CHANNEL: {
		const {ids} = action.payload
		return state
			.update(`leftChannel`, channel => channel && ids.includes(channel.id) ? null : channel)
			.update(`rightChannel`, channel => channel && ids.includes(channel.id) ? null : channel)
	}
	default:
		return state
	}
}

export default editReducer
