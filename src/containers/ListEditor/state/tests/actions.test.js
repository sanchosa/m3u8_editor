import {
	LOAD_NEW_LIST,
	SET_NEW_LIST,
	SET_CONTROL,
	SORT_CHANNEL,
	SORT_GROUP,
	SET_LIST_NAME,
	CREATE_GROUP,
	DELETE_GROUP,
	EDIT_GROUP,
	CREATE_CHANNEL,
	EDIT_CHANNEL,
	DELETE_CHANNEL,
	COPY_CHANNEL
} from '../constants'
import {
	loadNewList,
	setNewList,
	setControl,
	sortChannel,
	sortGroup,
	setListName,
	createGroup,
	deleteGroup,
	editGroup,
	createChannel,
	editChannel,
	deleteChannel,
	copyChannel
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
	describe(`createGroup`, () => {
		it(`should return the type and payload object`, () => {
			const expectedResult = {
				type: CREATE_GROUP,
				payload: testValues.string
			}
			expect(createGroup(testValues.string)).toEqual(expectedResult)
		})
	})
	describe(`deleteGroup`, () => {
		it(`should return the type and payload object`, () => {
			const expectedResult = {
				type: DELETE_GROUP,
				payload: testValues.string
			}
			expect(deleteGroup(testValues.string)).toEqual(expectedResult)
		})
	})
	describe(`editGroup`, () => {
		it(`should return the type and payload object`, () => {
			const expectedResult = {
				type: EDIT_GROUP,
				payload: testValues.string
			}
			expect(editGroup(testValues.string)).toEqual(expectedResult)
		})
	})
	describe(`createChannel`, () => {
		it(`should return the type and payload object`, () => {
			const expectedResult = {
				type: CREATE_CHANNEL,
				payload: testValues.string
			}
			expect(createChannel(testValues.string)).toEqual(expectedResult)
		})
	})
	describe(`editChannel`, () => {
		it(`should return the type and payload object`, () => {
			const expectedResult = {
				type: EDIT_CHANNEL,
				payload: testValues.string
			}
			expect(editChannel(testValues.string)).toEqual(expectedResult)
		})
	})
	describe(`deleteChannel`, () => {
		it(`should return the type and payload object`, () => {
			const expectedResult = {
				type: DELETE_CHANNEL,
				payload: testValues.string
			}
			expect(deleteChannel(testValues.string)).toEqual(expectedResult)
		})
	})
	describe(`copyChannel`, () => {
		it(`should return the type and payload object`, () => {
			const expectedResult = {
				type: COPY_CHANNEL,
				payload: testValues.string
			}
			expect(copyChannel(testValues.string)).toEqual(expectedResult)
		})
	})
})
