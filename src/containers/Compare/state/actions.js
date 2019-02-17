import {SET_VALUES} from './constants'

export const setValues = data => ({
	type: SET_VALUES,
	payload: data,
})
