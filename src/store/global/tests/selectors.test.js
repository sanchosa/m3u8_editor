import {fromJS} from 'immutable'
import {
	selectGlobal,
	makeSelectLoading,
	makeSelectError,
	makeSelectLocation,
	makeSelectLocale,
	makeSelectStorageFlag,
	makeSelectStorageInfo,
} from '../selectors'
import {initialState} from '../constants'

describe(`Global state selectors`, () => {
	const errorData = fromJS({code: 404, message: `User not found`})
	const mockedState = fromJS({global: initialState})
		.setIn([`global`, `error`], errorData)
	it(`should select the global state`, () => {
		const expectedResult = mockedState.get(`global`)
		expect(selectGlobal(mockedState)).toEqual(expectedResult)
	})
	it(`should select loading from global state`, () => {
		const selectLoading = makeSelectLoading()
		expect(selectLoading(mockedState)).toEqual(false)
	})
	it(`should select error from global state`, () => {
		const selectError = makeSelectError()
		expect(selectError(mockedState)).toEqual(errorData)
	})
	it(`should select locale from global state`, () => {
		const expectedResult = `enUS`
		const selector = makeSelectLocale()
		expect(selector(mockedState)).toEqual(expectedResult)
	})
	it(`should select "useStorage" flag from global state`, () => {
		const selector = makeSelectStorageFlag()
		expect(selector(mockedState)).toEqual(false)
	})
	it(`should select storageInfo from global state`, () => {
		const expectedResult = mockedState.getIn([`global`, `storageInfo`])
		const selector = makeSelectStorageInfo()
		expect(selector(mockedState)).toEqual(expectedResult)
	})
	it(`should select location from global state`, () => {
		const expectedResult = mockedState.getIn([`global`, `location`])
		const selectLocation = makeSelectLocation()
		expect(selectLocation(mockedState)).toEqual(expectedResult)
	})
})
