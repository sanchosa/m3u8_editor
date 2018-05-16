import {Map} from 'immutable'
import {initialState} from '../constants'
import {initialState as listEditor} from 'containers/ListEditor/state/constants'
import {makeSelectEditParam, makeSelectTransferData} from '../selectors'
import {testValues} from 'common/constants'

const mockedState = Map({
	edit: initialState,
	listEditor
})

describe(`Edit state selectors`, () => {
	it(`Should select param from Edit data`, () => {
		const State = mockedState.setIn([`edit`, `leftGroup`], testValues.string)
		const expectedResult = State.getIn([`edit`, `leftGroup`])
		const makeSelect = makeSelectEditParam(`leftGroup`)
		expect(makeSelect(State)).toEqual(expectedResult)
	})
	it(`Should select default data for Transfer component`, () => {
		let expectedResult = Map({})
		const makeSelect = makeSelectTransferData()
		expect(makeSelect(mockedState)).toEqual(expectedResult)
		expectedResult = Map({dataSource: [], targetKeys: []})
		const State = mockedState.setIn([`edit`, `leftGroup`], testValues.string)
		expect(makeSelect(State)).toEqual(expectedResult)
	})
})
