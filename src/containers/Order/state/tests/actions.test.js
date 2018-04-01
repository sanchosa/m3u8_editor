import {SET_GROUP} from '../constants'
import {setGroup} from '../actions'
import {testValues} from 'common/constants'

describe(`Order actions`, () => {
	describe(`setGroup`, () => {
		it(`should return the type and payload object`, () => {
			const expectedResult = {
				type: SET_GROUP,
				payload: testValues.string
			}
			expect(setGroup(testValues.string)).toEqual(expectedResult)
		})
	})
})
