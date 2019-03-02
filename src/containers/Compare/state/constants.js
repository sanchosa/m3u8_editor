import {fromJS} from 'immutable'
export const SET_VALUES = `Compare/SET_VALUES`

export const initialState = fromJS({
	selectedNewChannels: [],
	selectedNewLinks: [],
	selectedLostChannels: [],
})