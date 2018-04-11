import {setValue} from '../actions'
import {SET_VALUE} from '../constants'
import {testValues} from 'common/constants'

describe(`Edit actions`, () => {
	describe(`setValue`, () => {
		it(`should return the type of DEFAULT_ACTION and payload object of {name, value}`, () => {
			const expectedResult = {
				type: SET_VALUE,
				payload: {
					name: testValues.string,
					value: testValues.string
				}
			}
			expect(setValue(testValues.string, testValues.string)).toEqual(expectedResult)
		})
	})
})
