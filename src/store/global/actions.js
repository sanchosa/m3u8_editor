import {SET_LOADING, SET_ERROR} from './constants'

export function setLoading(payload) {
	return {
		type: SET_LOADING,
		payload
	}
}

export function setError(payload) {
	return {
		type: SET_ERROR,
		payload
	}
}
