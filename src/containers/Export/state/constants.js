import {fromJS} from 'immutable'

export const BUILD_LIST = `Export/BUILD_LIST`
export const STOP = `Export/STOP`
export const SET_PARAM = `Export/SET_PARAM`

export const initialState = fromJS({
	data: null,
	loading: false,
	groupTitleFlag: true,
	groupExtentionFlag: true,
	readonly: true
})