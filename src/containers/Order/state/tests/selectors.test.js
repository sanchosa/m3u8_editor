import {List, fromJS} from 'immutable'
import {makeSelectGroupChannels, makeSelectGroup} from '../selectors'
import {initialState} from '../constants'

const mockedState = fromJS({
	order: initialState,
	listEditor: {
		groups: {
			test: [1, 2]
		},
		channels: {
			1: {
				id: 1,
				name: `test1`
			},
			2: {
				id: 2,
				name: `test2`
			}
		}
	}
}).setIn([`order`, `group`], `test`)

describe(`Order state selectors`, () => {
	it(`Should select group`, () => {
		const expectedResult = `test`
		const makeSelect = makeSelectGroup()
		expect(makeSelect(mockedState)).toEqual(expectedResult)
	})

	it(`Should select channels of test group`, () => {
		const expectedResult = List([
			{
				id: 1,
				name: `test1`
			},
			{
				id: 2,
				name: `test2`
			}
		])
		const makeSelect = makeSelectGroupChannels()
		expect(makeSelect(mockedState)).toEqual(expectedResult)
	})
})