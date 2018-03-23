import {
	LOAD_NEW_LIST,
	SET_NEW_LIST
} from './constants'

export const loadNewList = fileObject => {
	return {
		type: LOAD_NEW_LIST,
		payload: fileObject
	}
}

export const setNewList = data => {
	return {
		type: SET_NEW_LIST,
		payload: data
	}
}