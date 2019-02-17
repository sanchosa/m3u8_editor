import {fromJS} from 'immutable'

export const LOAD_NEW_LIST = `ListEditor/LOAD_NEW_LIST`
export const COMPARE_LIST = `ListEditor/COMPARE_LIST`
export const SET_NEW_LIST = `ListEditor/SET_NEW_LIST`
export const SET_COMPARE_LIST = `ListEditor/SET_COMPARE_LIST`
export const SET_CONTROL = `ListEditor/SET_CONTROL`
export const SORT_CHANNEL = `ListEditor/SORT_CHANNEL`
export const SORT_GROUP = `ListEditor/SORT_GROUP`
export const SET_LIST_NAME = `ListEditor/SET_LIST_NAME`
export const CREATE_GROUP = `ListEditor/CREATE_GROUP`
export const DELETE_GROUP = `ListEditor/DELETE_GROUP`
export const EDIT_GROUP = `ListEditor/EDIT_GROUP`
export const CREATE_CHANNEL = `ListEditor/CREATE_CHANNEL`
export const EDIT_CHANNEL = `ListEditor/EDIT_CHANNEL`
export const DELETE_CHANNEL = `ListEditor/DELETE_CHANNEL`
export const COPY_CHANNEL = `ListEditor/COPY_CHANNEL`
export const MOVE_CHANNEL = `ListEditor/MOVE_CHANNEL`
export const LOAD_STORAGE_LIST = `ListEditor/LOAD_STORAGE_LIST`

export const initialState = fromJS({
	control: `import`,
	groups: {
		none: [],
		index: [`none`]
	},
	channels: {},
	compare: {},
	playlistName: null
})