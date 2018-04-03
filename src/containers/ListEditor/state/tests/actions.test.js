import {
	LOAD_NEW_LIST,
	SET_NEW_LIST,
	SET_CONTROL,
	SORT_CHANNEL,
	SORT_GROUP,
	SET_LIST_NAME
} from '../constants'
import {
	loadNewList,
	setNewList,
	setControl,
	sortChannel,
	sortGroup,
	setListName
} from '../actions'
import {testValues} from 'common/constants'

describe(`ListEditor actions`, () => {
	describe(`loadNewList`, () => {
		it(`should return the type and payload object`, () => {
			const expectedResult = {
				type: LOAD_NEW_LIST,
				payload: testValues.string
			}
			expect(loadNewList(testValues.string)).toEqual(expectedResult)
		})
	})
	describe(`setNewList`, () => {
		it(`should return the type and payload object`, () => {
			const expectedResult = {
				type: SET_NEW_LIST,
				payload: testValues.string
			}
			expect(setNewList(testValues.string)).toEqual(expectedResult)
		})
	})
	describe(`setControl`, () => {
		it(`should return the type and payload object`, () => {
			const expectedResult = {
				type: SET_CONTROL,
				payload: testValues.string
			}
			expect(setControl(testValues.string)).toEqual(expectedResult)
		})
	})
	describe(`sortChannel`, () => {
		it(`should return the type and payload object`, () => {
			const expectedResult = {
				type: SORT_CHANNEL,
				payload: testValues.string
			}
			expect(sortChannel(testValues.string)).toEqual(expectedResult)
		})
	})
	describe(`sortGroup`, () => {
		it(`should return the type and payload object`, () => {
			const expectedResult = {
				type: SORT_GROUP,
				payload: testValues.string
			}
			expect(sortGroup(testValues.string)).toEqual(expectedResult)
		})
	})
	describe(`setListName`, () => {
		it(`should return the type and payload object`, () => {
			const expectedResult = {
				type: SET_LIST_NAME,
				payload: testValues.string
			}
			expect(setListName(testValues.string)).toEqual(expectedResult)
		})
	})
})
