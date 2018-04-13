import {
	LOAD_NEW_LIST,
	SET_NEW_LIST,
	SET_CONTROL,
	SORT_CHANNEL,
	SORT_GROUP,
	SET_LIST_NAME,
	CREATE_GROUP
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

export const setControl = control => {
	return {
		type: SET_CONTROL,
		payload: control
	}
}

export const sortChannel = payload => {
	return {
		type: SORT_CHANNEL,
		payload
	}
}

export const sortGroup = payload => {
	return {
		type: SORT_GROUP,
		payload
	}
}

export const setListName = payload => {
	return {
		type: SET_LIST_NAME,
		payload
	}
}

export const createGroup = payload => {
	return {
		type: CREATE_GROUP,
		payload
	}
}