import {setParam} from '../actions'
import {initialState} from '../constants'
import reducer from '../reducer'

describe(`exportReducer`, () => {
	it(`returns the initial state`, () => {
		expect(reducer(undefined, {})).toEqual(initialState)
	})
	it(`sets the required param`, () => {
		const expected = initialState.set(`test`, `test`)
		const action = setParam({test: `test`})
		expect(reducer(initialState, action)).toEqual(expected)
	})
})
