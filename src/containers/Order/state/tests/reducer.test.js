import {testValues} from 'common/constants'
import reducer from '../reducer'
import {setGroup} from '../actions'
import {initialState} from '../constants'

describe(`Order reducer`, () => {
	it(`should return the initial state`, () => {
		const expectedResult = initialState
		expect(reducer(undefined, {})).toEqual(expectedResult)
	})
	it(`should set group`, () => {
		const group = testValues.string
		const expectedResult = initialState.set(`group`, group)
		const action = setGroup(group)
		expect(reducer(initialState, action)).toEqual(expectedResult)
	})
})