import {
	buildList,
	stop,
	setParam
} from '../actions'
import {
	BUILD_LIST,
	STOP,
	SET_PARAM
} from '../constants'
import {testValues} from 'common/constants'

describe(`Export actions`, () => {
	it(`Should return a type of ${BUILD_LIST} & payload object`, () => {
		const expected = {
			type: BUILD_LIST,
			payload: testValues.string
		}
		expect(buildList(testValues.string)).toEqual(expected)
	})
	it(`Should return a type of ${STOP} & null payload`, () => {
		const expected = {
			type: STOP,
			payload: null
		}
		expect(stop()).toEqual(expected)
	})
	it(`Should return a type of ${SET_PARAM} & payload object`, () => {
		const expected = {
			type: SET_PARAM,
			payload: testValues.string
		}
		expect(setParam(testValues.string)).toEqual(expected)
	})
})
