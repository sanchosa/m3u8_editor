import {
	SET_PARAM,
	initialState
} from './constants'

export default function exportReducer(state = initialState, action) {
	switch (action.type) {
	case SET_PARAM:
		// const {name, value} = action.payload
		return state.withMutations(map => {
			let result = map

			Object.keys(action.payload).forEach(key =>
				result = result.set(key, action.payload[key])
			)

			return result
		})
	default:
		return state
	}
}
