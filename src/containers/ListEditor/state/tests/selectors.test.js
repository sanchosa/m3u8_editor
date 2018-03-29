import {Map, List} from 'immutable'
import {
	makeSelectEditorData,
	makeSelectGroupNames
} from '../selectors'
import {initialState} from '../constants'

const mockedState = Map({listEditor: initialState})
	.setIn([`listEditor`, `groups`, `index`], List([`none`, `1`, `2`]))

describe(`ListEditor state selectors`, () => {
	it(`Should select data of listEditor`, () => {
		const expectedResult = mockedState.getIn([`listEditor`, `control`])
		const makeSelect = makeSelectEditorData(`control`)
		expect(makeSelect(mockedState)).toEqual(expectedResult)
	})

	it(`Should select groups names`, () => {
		const expectedResult = mockedState.getIn([`listEditor`, `groups`, `index`])
		const makeSelect = makeSelectGroupNames()
		expect(makeSelect(mockedState)).toEqual(expectedResult)
	})
})