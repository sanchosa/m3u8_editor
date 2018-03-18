import {put} from 'redux-saga/effects'
import injectSaga from '../inject-saga'
import * as sagaInjectors from '../saga-injectors'

const Component = () => null

function *testSaga() {
	yield put({type: `TEST`, payload: `yup`})
}

describe(`injectSaga decorator`, () => {
	let injectors
	let ComponentWithSaga

	beforeAll(() => {
		sagaInjectors.default = jest.fn().mockImplementation(() => injectors)
	})

	beforeEach(() => {
		injectors = {
			injectSaga: jest.fn(),
			ejectSaga: jest.fn()
		}
		ComponentWithSaga = injectSaga({key: `test`, saga: testSaga, mode: `testMode`})(Component)
		sagaInjectors.default.mockClear()
	})
	it(`should set a correct display name`, () => {
		expect(ComponentWithSaga.displayName).toBe(`withSaga(Component)`)
		expect(injectSaga({key: `test`, saga: testSaga})(() => null)
			.displayName).toBe(`withSaga(Component)`)
	})
})
