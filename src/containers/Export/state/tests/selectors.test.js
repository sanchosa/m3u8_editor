import {fromJS} from 'immutable'
import {initialState} from '../constants'
import {makeSelectParam} from '../selectors'

const State = fromJS({
	export: initialState
})

describe(`Test Export Selectors`, () => {
	it(`Should select loading param`, () => {
		const expected = State.getIn([`export`, `loading`])
		const selector = makeSelectParam(`loading`)
		expect(selector(State)).toEqual(expected)
	})
})
