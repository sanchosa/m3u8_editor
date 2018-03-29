import {SET_GROUP} from './constants'

export function setGroup(value) {
	return {
		type: SET_GROUP,
		payload: value
	}
}
