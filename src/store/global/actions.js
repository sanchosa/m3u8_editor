import {SET_LOADING, SET_ERROR, SET_LOCALE, SET_STORAGE_FLAG} from './constants'

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

export function setLocale(payload) {
	return {
		type: SET_LOCALE,
		payload
	}
}

export function setStorageFlag(payload) {
	return {
		type: SET_STORAGE_FLAG,
		payload
	}
}