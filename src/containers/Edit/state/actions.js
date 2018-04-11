import {SET_VALUE} from './constants'

export function setValue(name, value) {
	return {
		type: SET_VALUE,
		payload: {name, value}
	}
}
