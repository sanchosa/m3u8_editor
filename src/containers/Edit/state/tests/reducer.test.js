// import {fromJS} from 'immutable'
import editReducer from '../reducer'
import {initialState} from '../constants'

describe(`editReducer`, () => {
	it(`returns the initial state`, () => {
		expect(editReducer(undefined, {})).toEqual(initialState)
	})
})
