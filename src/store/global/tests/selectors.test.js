import {fromJS} from 'immutable'
import {
	selectGlobal,
	makeSelectLoading,
	makeSelectError,
	selectRoute,
	makeSelectLocation
} from '../selectors'

describe(`Global state selectors`, () => {
	let mockedState
	beforeEach(() => {
		mockedState = fromJS({
			global: {
				loading: true,
				error: {
					code: 404,
					message: `User not found`
				}
			}
		})
	})
	it(`should select the global state`, () => {
		const expectedResult = fromJS({
			loading: true,
			error: {
				code: 404,
				message: `User not found`
			}
		})
		expect(selectGlobal(mockedState)).toEqual(expectedResult)
	})
	it(`should select loading from global state`, () => {
		const expectedResult = true
		const selectLoading = makeSelectLoading()
		expect(selectLoading(mockedState)).toEqual(expectedResult)
	})
	it(`should select error from global state`, () => {
		const expectedResult = fromJS({
			code: 404,
			message: `User not found`
		})
		const selectError = makeSelectError()
		expect(selectError(mockedState)).toEqual(expectedResult)
	})
})
describe(`Route state selectors`, () => {
	let mockedState
	beforeEach(() => {
		mockedState = fromJS({
			route: {
				location: {
					pathname: `/home`,
					search: `prono`,
					hash: `free`
				}
			}
		})
	})
	it(`should select the route state`, () => {
		const expectedResult = fromJS({
			location: {
				pathname: `/home`,
				search: `prono`,
				hash: `free`
			}
		})
		expect(selectRoute(mockedState)).toEqual(expectedResult)
	})
	it(`should select location from route state`, () => {
		const expectedResult = {
			pathname: `/home`,
			search: `prono`,
			hash: `free`
		}
		const selectLocation = makeSelectLocation()
		expect(selectLocation(mockedState)).toEqual(expectedResult)
	})
})
