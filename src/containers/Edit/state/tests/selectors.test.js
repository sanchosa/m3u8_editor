import {Map} from 'immutable'
import {initialState} from '../constants'
import {makeSelectEditParam} from '../selectors'
import {testValues} from 'common/constants'

const mockedState = Map({Edit: initialState})
	.setIn([`edit`, `leftGroup`], testValues.string)

describe(`Edit state selectors`, () => {
	it(`Should select param from Edit data`, () => {
		const expectedResult = mockedState.getIn([`edit`, `leftGroup`])
		const makeSelect = makeSelectEditParam(`leftGroup`)
		expect(makeSelect(mockedState)).toEqual(expectedResult)
	})
})
