import {memoryHistory} from 'react-router-dom'
import {fromJS} from 'immutable'

import configureStore from 'store'
import getInjectors, {
	reducerStore,
	injectReducerFactory
} from '../reducer-injectors'

const initialState = fromJS({reduced: `soon`})

const reducer = (state = initialState, action) => {
	switch (action.type) {
	case `TEST`:
		return state.set(`reduced`, action.payload)
	default:
		return state
	}
}

describe(`reducer injectors`, () => {
	let store
	let injectReducer

	describe(`getInjectors`, () => {
		beforeEach(() => {
			store = configureStore(memoryHistory)
			reducerStore.clear()
		})

		it(`should return injectors`, () => {
			expect(getInjectors(store)).toEqual(
				expect.objectContaining({injectReducer: expect.any(Function)})
			)
		})

		it(`should throw if passed invalid store shape`, () => {
			Reflect.deleteProperty(store, `dispatch`)
			expect(() => getInjectors(store)).toThrow()
		})
	})

	describe(`injectReducer helper`, () => {
		beforeEach(() => {
			store = configureStore(memoryHistory)
			injectReducer = injectReducerFactory(store, true)
			reducerStore.clear()
		})

		it(`should check a store if the second argument is falsy`, () => {
			const inject = injectReducerFactory({})
			expect(() => inject({test: reducer})).toThrow()
		})

		it(`should not check a store if the second argument is true`, () => {
			Reflect.deleteProperty(store, `dispatch`)
			expect(() => injectReducer({test: reducer}, true)).not.toThrow()
		})

		it(`should validate a reducer and reducer's key`, () => {
			expect(() => injectReducer({'': reducer})).toThrow()
			expect(() => injectReducer({test: 1})).toThrow()
		})

		it(`given a store, it should provide a function to inject a reducer`, () => {
			injectReducer({test: reducer})
			const actual = store.getState().get(`test`)
			const expected = initialState
			expect(actual.toJS()).toEqual(expected.toJS())
		})

		it(`should assign a reducer`, () => {
			injectReducer({test: reducer})
			const expectedResult = {test: reducer}
			expect(reducerStore.get()).toEqual(expectedResult)
		})

		it(`should dispatch an action`, () => {
			injectReducer({test: reducer})
			const expected = `New value`
			store.dispatch({type: `TEST`, payload: expected})
			const fixture = store.getState().getIn([`test`, `reduced`])
			expect(fixture).toEqual(expected)
		})
	})
})
