import {Map} from 'immutable'
import {
	makeSelectEditorData
} from '../selectors'
import {initialState} from '../constants'

const mockedState = Map({listEditor: initialState})

describe(`ListEditor state selectors`, () => {
	it(`Should select data of listEditor`, () => {
		const expectedResult = mockedState.getIn([`listEditor`, `control`])
		const makeSelect = makeSelectEditorData(`control`)
		expect(makeSelect(mockedState)).toEqual(expectedResult)
	})
})