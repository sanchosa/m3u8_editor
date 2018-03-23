import {fromJS} from 'immutable'

export const LOAD_NEW_LIST = `ListEditor/LOAD_NEW_LIST`
export const SET_NEW_LIST = `ListEditor/SET_NEW_LIST`

export const initialState = fromJS({
	groups: {},
	channels: {},
	playlistName: null
})