import {fromJS} from 'immutable'
import {
	selectGlobal,
	makeSelectLoading,
	makeSelectError,
	selectRoute,
	makeSelectLocation,
	makeSelectLocale
} from '../selectors'

describe(`Global state selectors`, () => {
	let mockedState
	beforeEach(() => {
		mockedState = fromJS({
			global: {
				locale: `en`,
				loading: true,
				error: {
					code: 404,
					message: `User not found`
				}
			}
		})
	})
	it(`should select the global state`, () => {
		const expectedResult = mockedState.get(`global`)
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
	it(`should select locale from global state`, () => {
		const expectedResult = `en`
		const selector = makeSelectLocale()
		expect(selector(mockedState)).toEqual(expectedResult)
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
