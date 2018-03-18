import {browserHistory} from 'react-router-dom'
import configureStore from '../index'

describe(`configureStore`, () => {
	let store
	beforeAll(() => {
		store = configureStore(browserHistory)
	})

	describe(`injectedSagas`, () => {
		it(`should contain an object for sagas`, () => {
			expect(typeof store.injectedSagas).toBe(`object`)
		})
	})

	describe(`runSaga`, () => {
		it(`should contain a hook for 'sagaMiddleware.run'`, () => {
			expect(typeof store.runSaga).toBe(`function`)
		})
	})
})
