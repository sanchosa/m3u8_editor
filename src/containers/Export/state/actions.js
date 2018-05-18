import {
	BUILD_LIST,
	STOP,
	SET_PARAM
} from './constants'

export function buildList(payload) {
	return {
		type: BUILD_LIST,
		payload
	}
}

export function stop() {
	return {
		type: STOP,
		payload: null
	}
}

export function setParam(payload) {
	return {
		type: SET_PARAM,
		payload
	}
}