import {fromJS} from 'immutable'
export const DEFAULT_ACTION = `StoreBranch/Compare/DEFAULT_ACTION`

export const initialState = fromJS({
	selectedNewKeys: [],
	selectedLostKeys: [],
})